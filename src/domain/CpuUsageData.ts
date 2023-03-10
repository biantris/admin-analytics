type DataType = {
  labels: string[];
  data: number[];
};

export interface ICPUData {
  data: DataType;
}

export const mapUsageData = (memoryUsageData: ICPUData) => ({
  ...memoryUsageData,
});

export const mapMemoryCPUData = (listCPUData: any) => {
  const listCPUDataFormatted: any[] = [];

  const labels = listCPUData['labels'];
  const datas = listCPUData['data'];

  for (let index = 0; index < labels.length; index++) {
    listCPUDataFormatted.push({
      id: index,
      label: labels[index],
      value: datas[index],
    });
  }

  return listCPUDataFormatted;
};
