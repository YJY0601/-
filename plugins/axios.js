import { Message } from "element-ui"

export default ({ $axios }) => {
  $axios.onError(err => {
    // console.log(err.response.data);
    const { message, statusCode } = err.response.data

    if (statusCode === 400) {
      Message.warning(message)
    }
  })
}