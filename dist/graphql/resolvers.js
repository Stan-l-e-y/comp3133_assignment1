import { User } from '../models/user.js';
import { Employee } from '../models/employee.js';
import crypto from 'crypto';
export const resolvers = {
    Query: {
        async login(_, { loginInput: { email, password } }) {
            const hash = crypto.createHash('sha256').update(password).digest('hex');
            const user = await User.findOne({ email });
            if (!user)
                return 'invalid credentials';
            if (user.password == hash) {
                return 'Successfully logged in';
            }
            return 'invalid credentials';
        },
        async getAllEmployees() {
            const employees = await Employee.find({});
            return employees;
        },
        async getEmployee(_, { id }) {
            const employee = await Employee.findById(id);
            return employee;
        },
    },
    Mutation: {
        async signUp(_, { signUpInput: { username, email, password } }) {
            const hash = crypto.createHash('sha256').update(password).digest('hex');
            const newUser = new User({
                username,
                email,
                password: hash,
            });
            const res = await newUser.save();
            return {
                email: res.email,
                id: res.id,
                password: res.password,
                username: res.username,
            };
        },
        async addEmployee(_, { addEmployeeInput: { first_name, last_name, email, gender, salary } }) {
            const newEmployee = new Employee({
                first_name,
                last_name,
                email,
                gender,
                salary,
            });
            const employee = await newEmployee.save();
            return {
                id: employee.id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                gender: employee.gender,
                salary: employee.salary,
            };
        },
        async updateEmployee(_, { id, updateInput }) {
            const employee = await Employee.findByIdAndUpdate(id, updateInput);
            await employee.save();
            return employee;
        },
        async deleteEmpoyee(_, { id }) {
            const deleted = await Employee.findByIdAndRemove(id);
            if (deleted) {
                return 'Successfully deleted';
            }
            return 'Employee not found';
        },
    },
};
