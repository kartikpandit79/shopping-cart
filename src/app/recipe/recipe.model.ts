import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public name: string;
  public desc: string;
  public imagePath: string;
  public ingred: Ingredient [];

  constructor (name: string, desc: string, imageUrl: string, ingredient: Ingredient[]) {
    this.name = name;
    this.desc = desc;
    this.imagePath = imageUrl;
    this.ingred = ingredient;
}
}
