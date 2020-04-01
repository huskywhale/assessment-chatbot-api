const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    const channel = event.Channel.toLowerCase() === 'voice' ? 'Voice' : 'SMS'

    const message = await getTextForFunction('Menu', channel, channel)

    const questions = [
      {
        question: {
          say: message
        },
        name: 'Language'
      }
    ]
    const responseObject = {
      actions: [
        {
          collect: {
            name: 'ask_questions',
            questions: questions,
            on_complete: {
              redirect: `${process.env.ASSESMENT_API}/languagemenuoptions`
            }
          }
        }]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}