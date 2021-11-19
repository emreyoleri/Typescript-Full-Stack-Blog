import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import Blog from '../models/blog';

const create = (req: Request, res: Response, next: NextFunction) => {
    logging.info('Attempting to register blog ...');

    let { author, title, content, headline, picture } = req.body;

    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        author,
        title,
        content,
        headline,
        picture
    });

    console.log(blog);
    return blog
        .save()
        .then((newBlog) => {
            logging.info(`New blog created.`);
            return res.status(201).json({
                blog: newBlog
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const read = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    logging.info(`Incomig read for ${_id} ...`);

    return Blog.findById(_id)
        .populate('author')
        .then((blog) => {
            if (blog) {
                return res.status(200).json({
                    blog
                });
            } else {
                return res.status(404).json({
                    message: 'Not Found'
                });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    logging.info(`Incomig read all ...`);

    return Blog.find()
        .populate('author')
        .exec()
        .then((blogs) => {
            return res.status(200).json({
                count: blogs.length,
                blogs
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const query = (req: Request, res: Response, next: NextFunction) => {
    logging.info(`Incomig query ...`);

    return Blog.find(req.body)
        .populate('author')
        .exec()
        .then((blogs) => {
            return res.status(200).json({
                count: blogs.length,
                blogs
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const update = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    logging.info(`Incomig update for ${_id} ...`);

    return Blog.findById(_id)
        .exec()
        .then((blog) => {
            if (blog) {
                blog.set(req.body);

                return blog
                    .save()
                    .then((newBlog) => {
                        logging.info(`Blog updated.`);
                        return res.status(201).json({
                            blog: newBlog
                        });
                    })
                    .catch((error) => {
                        logging.error(error);
                        return res.status(500).json({
                            error
                        });
                    });
            } else {
                return res.status(404).json({
                    message: 'Not Found'
                });
            }
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

const deleteBlog = (req: Request, res: Response, next: NextFunction) => {
    const _id = req.params.blogID;
    logging.warn(`Incomig delete for ${_id} ...`);

    return Blog.findByIdAndDelete(_id)
        .then((blog) => {
            return res.status(200).json({
                message: 'Blog deleted'
            });
        })
        .catch((error) => {
            logging.error(error);
            return res.status(500).json({
                error
            });
        });
};

export default {
    create,
    read,
    readAll,
    query,
    update,
    deleteBlog
};
