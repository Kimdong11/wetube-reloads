import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type:String, maxlength: 20},
    description: {type:String, maxlength:80},
    createAt: {type: Date, required: true, default: Date.now},
    hashtags: [{type: String}],
    meta: {
        views: {type:Number, default: 0, required:true},
        rating: {type: Number, default: 0, required:true}
    }
});

videoSchema.pre("save", async function() {
    this.hashtags = this.hashtags[0].split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;