import axios from "axios";

export interface SendContactReq {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactRepository = {
  async sendContact(data: SendContactReq): Promise<{ success: boolean }> {
    const { data: response } = await axios.post("/api/contact", data);
    return response;
  },
};
