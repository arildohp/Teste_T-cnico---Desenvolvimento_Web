import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateRequest } from '../utils/validationUtils';
import { checkDuplicateReading, saveReading, callGeminiAPI } from '../services/uploadService';

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;

        const validationError = validateRequest(req.body);
        if (validationError) {
            res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: validationError,
            });
            return;
        }

        const duplicateError = await checkDuplicateReading(customer_code, measure_datetime, measure_type);
        if (duplicateError) {
            res.status(409).json({
                error_code: 'DOUBLE_REPORT',
                error_description: duplicateError,
            });
            return;
        }

        const measureValue = await callGeminiAPI(image);

        const measureUUID = uuidv4();
        const imageUrl = `https://tempstorage.com/images/${measureUUID}`;

        await saveReading(customer_code, measure_datetime, measure_type, measureValue, measureUUID);

        res.status(200).json({
            image_url: imageUrl,
            measure_value: measureValue,
            measure_uuid: measureUUID,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};