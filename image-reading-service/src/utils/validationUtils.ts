export const validateRequest = (data: {
    image: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: string;
}): string | null => {
    const { image, customer_code, measure_datetime, measure_type } = data;

    if (!image || !customer_code || !measure_datetime || !measure_type) {
        return 'Todos os campos são obrigatórios';
    }

    if (!['WATER', 'GAS'].includes(measure_type)) {
        return 'Tipo de medida inválido';
    }

    return null;
};