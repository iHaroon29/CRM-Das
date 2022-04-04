const taskModel = require('../../models/taskModel')

const fetchTask = async (req, res, next) => {
  try {
    let task = await taskModel.findOne({
      applicationTaskFlowUseCase: req.params.applicationTaskFlowUseCase,
    })
    if (task === null) {
      throw new Error('No such Entry found')
    }
    res.send({ status: 200, data: task })
  } catch (error) {
    console.log(error.message)
    res.status(400).send({
      message: error.message,
    })
  }
}
module.exports = {
  fetchedTask: fetchTask,
}
