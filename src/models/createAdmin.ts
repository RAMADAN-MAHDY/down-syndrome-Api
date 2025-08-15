import mongoose ,{Document , Schema} from 'mongoose'

interface ADMIN extends Document{
email : string;
pass : string;
}

const Adminschema = new Schema<ADMIN>({
    email : {type : String , required : true },
    pass : {type : String , required : true }
})

const AdminModel = mongoose.model<ADMIN>("admin" , Adminschema);

export default AdminModel;