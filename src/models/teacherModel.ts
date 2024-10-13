import mongoose, { Schema, Document } from 'mongoose';

interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  classroom: mongoose.Types.ObjectId;
}

const teacherSchema = new Schema<ITeacher>({
  name: {
     type: String,
     required: true
     },
  email: { 
    type: String, 
    required: true, 
    unique: true 
    },
  password: {
     type: String, 
     required: true,
     match: [/^[0-9]{9}$/, "passwordId must be  9 digits"]
     },
  classroom: {
     type: Schema.Types.ObjectId,
      ref: 'Classroom', 
      required: true 
    },
});

export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);