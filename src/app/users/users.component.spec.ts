//Angular Testing Package Imports
import { TestBed } from "@angular/core/testing"
import { provideHttpClient } from "@angular/common/http"

//App Imports
import { UsersComponent } from "./users.component"

describe('User Component Unit Test',()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [provideHttpClient()],
            imports: [UsersComponent]
        })
    });
    
    it('Component is created successfully', ()=>{
        let fixture = TestBed.createComponent(UsersComponent);
        let usersComponent = fixture.debugElement.componentInstance;
        expect(usersComponent).toBeTruthy();
    });

    it('State Should intialize in "None" State', ()=>{
        let fixture = TestBed.createComponent(UsersComponent);
        let usersComponent = fixture.debugElement.componentInstance;
        expect(usersComponent.state()).toEqual('None');
    });
})