class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    filter(){
        const queryObj = {...this.queryStr};
        const excludedFields = ['page', 'limit', 'sort', 'fields' ];
        excludedFields.forEach(ele => delete queryObj[ele]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);
        this.query.find(JSON.parse(queryStr));
        return this;
   
    }
    sort(){
        // 1B)sorting
           //for decending order compare function
        //    (a, b) => {
        //     return b[value]-a[value];
        // }
        if(this.queryStr.sort)
        {
            const value = this.queryStr.sort;
            this.query = this.query.sort((a, b) => {
                return a[value]-b[value];
            });
        }
        else{
            this.query = this.query.sort((a, b) =>{
                return a.createdAt - b.createdAt;
            });
        }
        return this;
    }
    limitingFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
           this.query = this.query.select(fields)
        }
        else{
            this.query = this.query.select('-__v');
        }
        return this;
    }
    pagination(){
        var page = this.queryStr.page * 1 || 1;
        var limit = this.queryStr.limit * 1 || 100 ;
        var skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        // // validate page Number
        // if(this.queryStr.page){
        //     const allTours = await Tour.countDocuments();
        //     if(skip >= allTours){
        //         throw new Error('This page does not exist');
        //     }
        // }
        return this;
    }
}
module.exports = APIFeatures;