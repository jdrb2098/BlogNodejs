const postControllers = require("./posts.controller")

const getAll = (req, res) => {
    const data = postControllers.getAllPosts();
    res.status(200).json({items: data.length, posts: data})
}

const getById = (req, res) => {
    const id = req.params.id;
    const data = postControllers.getPostById(id);

    if(data) {
        res.status(200).json(data)
    } else {
        res.status(404).json({message: `El post con el id ${id} no existe`})
    }
}

const getByIdLogged = (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;
    const data = postControllers.getPostByIdLogged(id, user_id);

    if(data) {
        res.status(200).json(data)
    } else {
        res.status(404).json({message: `El post con el id ${id} no existe`})
    }
}

const getByUserId = (req, res) => {
    const id = req.user.id;
    const data = postControllers.getPostByUserID(id);

    if(data) {
        res.status(200).json({items: data.length, posts: data})
    } else {
        res.status(404).json({message: `El Usuario no tiene posts`})
    }
}

const create = (req, res) => {
    const data = req.body;
    if(!data) {
        return res.status(400).json({message: "Missing Data"})
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image 
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
              title: "string",
              content: "string",
              header_image: "url_image"
            },
        })
    } else {
        data.user_id = req.user.id
        const response = postControllers.createPost(data);
        return res
            .status(201)
            .json({
                message: `Post created succesfully with id: ${response.id}`,
                post: response,
            });
    }
}

const remove = (req, res) => {
    const id = req.params.id;
    const data = postControllers.deletePost(id);
  
    if (data) {
        return res.status(204).json();
    } else {
        return res.status(400).json({ message: "Invalid ID" });
    }
};

const edit = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if(!Object.keys(data).length) {
        return res.status(400).json({message: "Misssing Data"});
    } else if (
        !data.title ||
        !data.content ||
        !data.header_image ||
        (data.published !== true && data.published !== false) 
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
              title: "string",
              content: "string",
              header_image: "url_image",
              published: "true or false (boolean)"
            },
        }) 
    } else {
        data.user_id = req.user.id 
        const response = postControllers.editPost(id, data)
        if(response.id !== id) {
            return res.status(201).json({
                message: `Post created succesfully with id: ${response.id}`,
                post: response,
            });
        }else {
            return res.status(200).json({
                message: 'User edited succesfully',
                user: response
            })
        }
    }
}

module.exports = {
    getAll,
    getById,
    getByIdLogged,
    getByUserId,
    create,
    remove,
    edit
}