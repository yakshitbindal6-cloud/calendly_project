import 'dotenv/config';
export const PORT = process.env.PORT || 3000;
export const DATABASE_URL=process.env.DATABASE_URL||'';
export const Node_env=process.env.Node_env||'development';
export const slot_Days=Number(process.env.slot_generationDays)||30;
