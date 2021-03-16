const isValidQuery = (value: any) =>
  typeof value === 'string' && isFinite(parseInt(value));

export const  getPagination = (page: any, offset: any) => {
  const itemsForPage = Number(offset);
  const selectedPage = Number(page);

  const from = Number(selectedPage) * itemsForPage - itemsForPage;
  const to = Number(selectedPage) * itemsForPage;

  return {
    itemsForPage,
    from,
    to,
  };
}

export const getPage = (page: any, offset: any, products: any[]) => {
  const { itemsForPage, from, to } = getPagination(page, offset);

  if (isValidQuery(page) && isValidQuery(offset)) {
    const TOTAL_PAGES = Math.ceil(products.length / itemsForPage);
    return {
      products: products.slice(from, to),
      pages: TOTAL_PAGES,
    };
  }

  return {
    products,
  };
}
