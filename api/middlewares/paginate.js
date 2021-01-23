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

            res.paginatedResults = results;
            next();
        }catch(e) {
            res.status(500).json(e);
        }
    }
};

module.exports = { paginate };