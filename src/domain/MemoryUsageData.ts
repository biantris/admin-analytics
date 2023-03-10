type DataType = {
  labels: string[];
  data: number[];
};

export interface IMemoryUsageData {
  data: DataType;
}

export const mapUsageData = (memoryUsageData: IMemoryUsageData) => ({
  ...memoryUsageData,
});

export const mapMemoryUsageData = (listMemoryUsageData: any) => {
  const listMemoryUsageDataFormatted: any[] = [];

  const labels = listMemoryUsageData['labels'];
  const datas = listMemoryUsageData['data'];

  for (let index = 0; index < labels.length; index++) {
    listMemoryUsageDataFormatted.push({
      id: index,
      label: labels[index],
      value: datas[index],
    });
  }

  return listMemoryUsageDataFormatted;
};
