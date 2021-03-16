import db from '../../products.json';
import knex from '../../database/connection';

class Select {
  public async rate(productId: string): Promise<{ rating: number }> {
    const [avg] = await knex('rating')
      .where('rating.product_id', '=', productId)
      .avg('rate');

    return {
      rating: avg['avg(`rate`)'] ?? 0,
    };
  }

  public async id(productId: string): Promise<object> {
    const id = Number(productId) - 1;
    const { rating } = await this.rate(productId);

    return {
      product: {
        ...db.products[id],
        rating,
      },
    };
  }

  public name(productName: string): object {
    const byName = ({ title }) =>
      ~title.toLowerCase().indexOf(productName.toLowerCase());

    return {
      products: db.products.filter(byName),
    };
  }

  public category(productCategory: string): object {
    const id = db.categories.indexOf(productCategory);
    const categoryId = id >= 0 ? id : Number(productCategory);

    return {
      products: db.products.filter(prod => prod.categoryId === categoryId),
      name: db.categories[categoryId],
      description: db.categoriesDescriptions[categoryId],
    };
  }

  public categories() {
    return {
      categories: db.categories,
    };
  }
}

export default new Select();
