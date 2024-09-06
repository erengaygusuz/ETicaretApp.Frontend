// pagination yapısı kullandığımda isteyebileceğim bir model yapısı olması lazım

// Bu model, sunucudan veri çekerken hangi sayfa numarasını, kaç öğenin gösterileceğini ve olası arama kriterlerini içerir

export class RequestModel {
  pageNumber: number = 1;
  pageSize: number = 10;
  search: string = '';
  categoryName: string = 'Tümü';
  categoryId: string = '';
  priceFilter: string = '0';
}
