db.towns.find( { name: { $regex: /e/ }, famous: { $regex: /food or beer/m} } )
