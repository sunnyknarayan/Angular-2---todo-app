import { TaskService } from './services/task.service';
import { Component } from '@angular/core';

@Component({
  moduleId : module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers :[TaskService]
})

export class AppComponent { 
  
}

