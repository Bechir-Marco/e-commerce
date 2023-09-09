import  Category from "../models/CategoryModel"

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).sort({ name: "asc" }).orFail();
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

export const newCategory = async (req, res, next) => {
    try {
        const { category } = req.body;
        if (!category) {
            res.status(400).send("Category input is required");
        }
        const categoryExists = await Category.findOne({ name: category });
        if (categoryExists) {
            res.status(400).send("Category already exists");
        } else {
            const categoryCreated = await Category.create({
                name: category
            });
            res.status(201).send({ categoryCreated: categoryCreated });
        }
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (req, res, next) => {
    // return res.send(req.params.category)
    try {
        if (req.params.category !== "Choose category") {
            const categoryExists = await Category.findOne({
                name: decodeURIComponent(req.params.category)
            }).orFail();
            
            await categoryExists.deleteOne();
            res.json({ categoryDeleted: true });
        }
    } catch (err) {
        next(err);
    }
};

export const saveAttr = async (req, res, next) => {
    console.log(req.body);
    const key = req.body.key;
    const val = req.body.val;
    const categoryChoosen = req.body.categoryChoosen;
    if (!key || !val || !categoryChoosen) {
        return res.status(400).send("All inputs are required");
    }
    try {
        const category = categoryChoosen.split("/")[0];
        const categoryExists = await Category.findOne({ name: category }).orFail();

        const existingAttribute = categoryExists.attrs.find((item) => item.key === key);

        if (existingAttribute) {
            const copyAttributeValues = [...existingAttribute.value];
            copyAttributeValues.push(val);
            existingAttribute.value = [...new Set(copyAttributeValues)]; 
        } else {
            categoryExists.attrs.push({ key: key, value: [val] });
        }

        // if (categoryExists.attrs.length > 0) {
        //     // if key exists in the database then add a value to the key
        //     let keyDoesNotExistsInDatabase = true;
        //     categoryExists.attrs.map((item, idx) => {
        //         if (item.key === key) {
        //             keyDoesNotExistsInDatabase = false;
        //             const copyAttributeValues = [...categoryExists.attrs[idx].value];
        //             copyAttributeValues.push(val);
        //             const newAttributeValues = [...new Set(copyAttributeValues)]; // Set ensures unique values
        //             categoryExists.attrs[idx].value = newAttributeValues;
        //         }
        //     });

        //     if (keyDoesNotExistsInDatabase) {
        //         categoryExists.attrs.push({ key: key, value: [val] });
        //     }
        // } else {
        //     // push to the array
        //     categoryExists.attrs.push({ key: key, value: [val] });
        // }
        await categoryExists.save();
        const cat = await Category.find({}).sort({ name: "asc" });
        return res.status(201).json({ categoriesUpdated: cat,pAttr: existingAttribute, });
    } catch (err) {
        next(err);
    }
};

