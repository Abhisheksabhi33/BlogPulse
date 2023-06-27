const asyncErrorWrapper = require("express-async-handler");
const Story = require("../Models/story");
const deleteImageFile = require("../Helpers/Libraries/deleteImageFile");
const {
  searchHelper,
  paginateHelper,
} = require("../Helpers/query/queryHelpers");
const cloudinary = require("../cloud/index");
const CustomError = require("../Helpers/error/CustomError");

const addStory = asyncErrorWrapper(async (req, res, next) => {
  const { title, content } = req.body;

  var wordCount = content.trim().split(/\s+/).length;

  let readtime = Math.floor(wordCount / 200);

  try {
    const newStory = await Story.create({
      title,
      content,
      author: req.user._id,
      readtime,
    });

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      newStory.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
      await newStory.save();
    }

    return res.status(200).json({
      id: newStory._id,
      title: newStory.title,
      content: newStory.content,
      image: newStory.image?.url,
    });
  } catch (error) {
    
    return next(error);
  }
});

const getAllStories = asyncErrorWrapper(async (req, res, next) => {
  let query = Story.find();

  query = searchHelper("title", query, req);

  const paginationResult = await paginateHelper(Story, query, req);

  query = paginationResult.query;

  query = query.sort("-likeCount -commentCount -createdAt");

  const stories = await query;

  return res.status(200).json({
    success: true,
    count: stories.length,
    data: stories,
    page: paginationResult.page,
    pages: paginationResult.pages,
  });
});

const detailStory = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { activeUser } = req.body;

  const story = await Story.findOne({
    slug: slug,
  }).populate("author likes");

  const storyLikeUserIds = story.likes.map((json) => json.id);
  const likeStatus = storyLikeUserIds.includes(activeUser._id);

  return res.status(200).json({
    success: true,
    data: story,
    likeStatus: likeStatus,
  });
});

const likeStory = asyncErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body;
  const { slug } = req.params;

  const story = await Story.findOne({
    slug: slug,
  }).populate("author likes");

  const storyLikeUserIds = story.likes.map((json) => json._id.toString());

  if (!storyLikeUserIds.includes(activeUser._id)) {
    story.likes.push(activeUser);
    story.likeCount = story.likes.length;
    await story.save();
  } else {
    const index = storyLikeUserIds.indexOf(activeUser._id);
    story.likes.splice(index, 1);
    story.likeCount = story.likes.length;

    await story.save();
  }

  return res.status(200).json({
    success: true,
    data: story,
  });
});

const editStoryPage = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;

  const story = await Story.findOne({
    slug: slug,
  }).populate("author likes");

  return res.status(200).json({
    success: true,
    data: story,
  });
});

const editStory = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;

  console.log(req.body);
  console.log(req.file);

  const { title, content } = req.body;


  const story = await Story.findOne({ slug: slug });

  const public_id = story.image?.public_id;

  if (public_id && req.file) {
    const { result } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok") {
      return next(new CustomError("Image could not be deleted", 400));
    }
}

    if (req.file) {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      story.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    story.title = title;
    story.content = content;
    await story.save();

    return res.status(200).json({
      id: story._id,
      title: story.title,
      content: story.content,
      image: story.image?.url,
    });
  
});

const deleteStory = asyncErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;

  const story = await Story.findOne({ slug: slug });

  const public_id = story.image?.public_id;

    if (public_id) {
        const { result } = await cloudinary.uploader.destroy(public_id);
         
        if (result !== "ok") {
            return next(new CustomError("Image could not be deleted", 400));
        }
    }

    await story.remove();

      

  return res.status(200).json({
    success: true,
    message: "Story delete succesfully ",
  });
});

module.exports = {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStoryPage,
  editStory,
  deleteStory,
};
