interface Reading {
    customer_code: string;
    measure_datetime: string;
    measure_type: string;
    measure_value: number;
    measure_uuid: string;
}

export const readingsDb = (() => {
    const readings: Reading[] = [];

    const findReading = async (customer_code: string, measure_datetime: string, measure_type: string): Promise<Reading | undefined> => {
        return readings.find(reading =>
            reading.customer_code === customer_code &&
            reading.measure_datetime === measure_datetime &&
            reading.measure_type === measure_type
        );
    };

    const saveReading = async (customer_code: string, measure_datetime: string, measure_type: string, measure_value: number, measure_uuid: string): Promise<void> => {
        readings.push({
            customer_code,
            measure_datetime,
            measure_type,
            measure_value,
            measure_uuid,
        });
    };

    return { findReading, saveReading };
})();