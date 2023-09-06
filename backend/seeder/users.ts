import * as bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

const myObjectId = new ObjectId("625add3d78fb449f9d9fe2ee");

const users = [
    {
        name: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin@admin.com', 10),
        isAdmin: true,
    },
    {
        _id: myObjectId,
        name: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: bcrypt.hashSync('john@doe.com', 10),
    },
];

export default users;
