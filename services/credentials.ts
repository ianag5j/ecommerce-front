import axios from "axios"

export const deleteCredentials = async () => {
  await axios.delete("/api/uala")
}