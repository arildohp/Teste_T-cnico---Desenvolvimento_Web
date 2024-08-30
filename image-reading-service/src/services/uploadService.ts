import axios from 'axios';
import { readingsDb } from '../db/readingsDb';

export const checkDuplicateReading = async (customer_code: string, measure_datetime: string, measure_type: string): Promise<string | null> => {
    const existingReading = await readingsDb.findReading(customer_code, measure_datetime, measure_type);
    if (existingReading) {
        return 'Leitura do mês já realizada';
    }
    return null;
};

export const callGeminiAPI = async (image: string): Promise<number> => {
    try {
        const response = await axios.post('https://api.google.com/gemini', {
            image: image,

        });
        return response.data.measure_value;  
    } catch (error) {
        console.error('Erro ao consultar a API do Gemini:', error);
        throw new Error('Erro ao consultar a API de reconhecimento');
    }
};

export const saveReading = async (customer_code: string, measure_datetime: string, measure_type: string, measure_value: number, measure_uuid: string): Promise<void> => {
    await readingsDb.saveReading(customer_code, measure_datetime, measure_type, measure_value, measure_uuid);
};
