import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
        private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let desc = '';
    let imgPath = '';
    let ingredit = new FormArray([]);

    if ( this.editMode) {
      const recipe = this.recipeService.getOneRecipe(this.id);
      recipeName = recipe.name;
      desc = recipe.desc;
      imgPath = recipe.imagePath;
      if ( recipe['ingred']) {
        for ( let recIngred of recipe.ingred) {
          ingredit.push(
            new FormGroup ({
              'name': new FormControl(recIngred.name, Validators.required),
              'amount': new FormControl(recIngred.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
          );
        }
      }
     }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'imagePath': new FormControl(imgPath, Validators.required),
      'ingred': ingredit,
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingred')).controls;
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingred']
    );
    if ( this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    // console.log(this.recipeForm.value['ingred']);
    this.onCancel();
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingred')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredients(index: number) {
    (<FormArray>this.recipeForm.get('ingred')).removeAt(index);
  }

}
