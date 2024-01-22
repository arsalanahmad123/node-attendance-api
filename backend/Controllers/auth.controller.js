const User = require('../models/user.model')
const bcryptjs = require('bcryptjs')


const register = async (req, res) => {
    const { name, email, password } = req.body
    if (name == "" || email == "" || password == "") {
        res.status(400).json({ message: "All fields are required" })
    }
    else {
        try {
            const hash = bcryptjs.hashSync(password);
            const user = await User.create({ name, email, password: hash })
            res.status(201).json({ message: "User created successfully", data: user, success: true })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

const getAttendance = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ attendances: user.attendances });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const createAttendance = async (req, res) => {
    const { status, date } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isDateUnique = !user.attendances.some((attendance) => attendance.date.toString() === new Date(date).toString());

        if (!isDateUnique) {
            return res.status(400).json({ message: 'Attendance already exists for the specified date' });
        }
        else {
            user.attendances.push({ status, date });
            await user.save();
            res.status(200).json({ message: 'Attendance updated successfully', data: user, success: true });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateAttendance = async (req, res) => {
    const { status, attendanceID } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const index = user.attendances.findIndex((attendance) => attendance._id.toString() === attendanceID);
        if (index === -1) {
            return res.status(404).json({ message: 'Attendance not found' });
        }
        user.attendances[index].status = status;
        await user.save();
        res.status(200).json({ message: 'Attendance updated successfully', data: user, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}



const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('name email attendances')
        res.status(200).json({ data: users, success: true })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const fetchUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json({ data: { name: user.name, email: user.email, attendances: user.attendances }, success: true })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { register, getUsers, getAttendance, createAttendance, fetchUser, updateAttendance }

