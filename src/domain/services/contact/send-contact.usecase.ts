import {
  ContactRepository,
  type SendContactReq,
} from "../../repositories/contact.repo";

export const sendContactUsecase = async (data: SendContactReq): Promise<void> => {
  const response = await ContactRepository.sendContact(data);
  if (!response.success) throw new Error("Failed to send message");
};
