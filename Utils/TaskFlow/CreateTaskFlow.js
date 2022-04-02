const taskModel = require('../../models/taskModel')
const crypto = require('crypto')

const createTask = async (req, res) => {
  let newTask = new taskModel({
    taskID: await crypto.randomBytes(20).toString('hex'),
    applicationID:
      req.body.applicationName +
      '-' +
      (await crypto.randomBytes(2).toString('hex')),
    applicationName: req.body.applicationName,
    applicationURL: req.body.applicationURL,
    applicationFLowURL:
      req.body.applicationURL +
      '/' +
      (await req.body.TaskFlowUseCase.toLowerCase().split('').join('')),
    applicationTaskFlowUseCase: req.body.TaskFlowUseCase,
    taskList: req.body.taskList,
  })

  try {
    if (await newTask.save()) {
      res.status(200).send({ message: 'Task Flow has been create' })
    }
  } catch (err) {
    let errorText = await /taskID|applicationID|applicationTaskFlowUseCase/
      .exec(err.message)[0]
      .toLowerCase()
    res.status(400).send({ message: `${errorText} already exists.` })
  }
}

module.exports = createTask
