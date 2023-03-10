import TaskModel from '../models/Task.js'
import pkg from 'lodash';



export const create = async (req, res) => {
  try {
    const doc = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      image: req.body.image,
      user: req.userId,
      executer: req.body.executer || req.userId,
      project: req.body.project || 'без проекта'
    })

    const task = await doc.save()
    res.json(task)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось создать задачу'
    })
  }
}

export const getLastProject = async (req, res) => {
  const {uniq} = pkg;
  try {
    const tasks = await TaskModel.find().populate('user').populate('executer').exec();

    const projects = tasks.map((obj) => obj.project).flat()
    const result = uniq(projects);
    res.json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить проекты'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const taskId = req.params.id
    TaskModel.findOne({
      _id: taskId
    }).populate('user').populate('executer').then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Задача не найдена'
        })
      }

      res.json(doc)
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить задачу'
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await TaskModel.find().populate('user').populate('executer').exec()
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось получить статьи'
    })
  }
}

export const remove = async (req, res) => {
  try {
    const taskId = req.params.id
    TaskModel.findOneAndDelete({
      _id: taskId
    }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: 'Не удалось удалить задачу'
        })
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Задача не найдена'
        })
      }

      res.json({
        success: true
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Ошибка при удалении задачи'
    })
  }
}

export const update = async (req, res) => {
  try {
    const taskId = req.params.id
    await TaskModel.updateOne({
      _id: taskId
    }, {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      image: req.body.image,
      user: req.userId,
      executer: req.body.executer || req.userId
    })

    res.json({
      success: true
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Не удалось обновить задачу'
    })
  }
}
