import mongoose from "mongoose";
import { CustomerDocument } from "../../../../models/mongoDB/customer.model";

export type TmCredentialDocument = mongoose.Document & {
	customer: mongoose.PopulatedDoc<CustomerDocument & mongoose.Document>;
	accessToken: string; // 1.5 hours
	refreshToken: string; // 1 month
	phone: number;
};

const TmCredentialSchema = new mongoose.Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "customer",
			required: true,
			unique: true,
		},
		accessToken: { type: String, required: true },
		refreshToken: { type: String, required: true },
		phone: { type: Number, required: true },
	},
	{ timestamps: true },
);
const model = mongoose.model<TmCredentialDocument>(
	"tmCredential",
	TmCredentialSchema,
);
export default model;

export const createCredential = async ({
	customerId,
	accessToken,
	refreshToken,
	phone,
}: {
	customerId: string;
	accessToken: string;
	refreshToken: string;
	phone: number;
}) => {
	const credential = await model.updateOne(
		{ customer: customerId },
		{ accessToken, refreshToken, phone },
		{ upsert: true },
	).exec();
	return credential;
};

export const updateCredential = async ({
	customerId,
	accessToken,
	refreshToken,
	phone,
}: {
	customerId: string;
	accessToken: string;
	refreshToken: string;
	phone: number;
}) => {
	const credential = await model.findOneAndUpdate(
		{ customer: customerId },
		{ accessToken, refreshToken, phone },
		{ new: true },
	).exec();
	return credential;
};

export const getCredential = async (customerId: string) => {
	const credential = await model.findOne({ customer: customerId }).exec();
	return credential;
};