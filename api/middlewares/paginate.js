const { Op } = require("sequelize");
filter = (model) => {
    return async (req, res, next) => {
        try{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const { location, num_floors, num_offices, rating, sort, order } = req.query;
            const ordering = [];

            if(sort !== null && order !== undefined) {
                ordering.push(sort, order)
            }else if(sort !== null && sort !== undefined){
                ordering.push(sort);
            }else{
                ordering.push('id');
            }

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {};

            if(!Number.isNaN(page) && !Number.isNaN(limit)) {
                results.data = await model.findAndCountAll({
                    where: {
                        [Op.or]: [
                            {
                                location: {
                                    [Op.like]: "%" + location + "%"
                                }
                            },
                            {
                                num_floors: {
                                    [Op.lte]: num_floors
                                }
                            },
                            {
                                num_offices: {
                                    [Op.lte]: num_offices
                                }
                            },
                            {
                                rating: {
                                    [Op.gte]: rating
                                }
                            }
                        ]
                    },
                    order: [
                        ordering
                    ],
                    limit: limit, 
                    offset: startIndex
                });

                if(endIndex < results.data.count) {
                    results.next = {
                        page: page + 1,
                        limit: limit
                    }
                }
    
                if(startIndex > 0) {
                    results.previous = {
                        page: page - 1,
                        limit: limit
                    }
                }
                results.paginated = true;
            }else{
                results.data = await model.findAll({
                    where: {
                        [Op.or]: [
                            {
                                location: {
                                    [Op.like]: "%" + location + "%"
                                }
                            },
                            {
                                num_floors: {
                                    [Op.lte]: num_floors
                                }
                            },
                            {
                                num_offices: {
                                    [Op.lte]: num_offices
                                }
                            },
                            {
                                rating: {
                                    [Op.gte]: rating
                                }
                            }
                        ]
                    },
                    order: [
                        ordering
                    ]
                });
                results.paginated = false;
            }

            res.finalResults = results;
            next();
        }catch(e) {
            res.status(500).json(e);
        }
    }
}

paginate = (model) => {
    return async (req, res, next) => {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const results = {};

            if(!Number.isNaN(page) && !Number.isNaN(limit)) {
                results.data = await model.findAndCountAll({ limit: limit, offset: startIndex });
                if(endIndex < results.data.count) {
                    results.next = {
                        page: page + 1,
                        limit: limit
                    }
                }
    
                if(startIndex > 0) {
                    results.previous = {
                        page: page - 1,
                        limit: limit
                    }
                }
                results.paginated = true;
            }else{
                results.data = await model.findAll();
                results.paginated = false;
            }

            res.finalResults = results;
            next();
        }catch(e) {
            res.status(500).json(e);
        }
    }
};

module.exports = { paginate, filter };