import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String, maxlength: 20},
    description: {type:String, maxlength:80},
    createAt: {type: Date, required: true, default: Date.now},
    hashtags: [{type: String}],
    fileUrl: {type:String, required:true},
    meta: {
        views: {type:Number, default: 0, required:true},
        rating: {type: Number, default: 0, required:true}
    },
    owner: {type:mongoose.Schema.Types.ObjectId, required: true, ref:"User"}
});

videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;