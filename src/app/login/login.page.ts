import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  senha: string = "";

  constructor(
    private router: Router,
    private provider: Api,
    private actRouter: ActivatedRoute,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  login() {
    //Essa estrutura é que chama uma API
    return new Promise(resolve => {
      let dados = {
        usuario: this.usuario,
        senha: this.senha,
      }
      this.provider.dadosApi(dados, 'login/login.php')
        .subscribe(
          data => {
            if (data['ok'] == true) {
              this.mensagem(data['usu']['nome'], 'success');
              console.log("Teste info: ", data['usu']);

              if (data['usu']['nivel'] == 'Administrador') {
                this.router.navigate(['folder']);
              }

              if (data['usu']['nivel'] == 'Tesoureiro') {
                this.router.navigate(['painel-financeiro']);
              }
            }
            else {
              this.mensagem(data['mensagem'], 'danger');
            }
          }
        );
    });
  }

  async mensagem(mensagem: any, cor) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 5000,
      color: cor
    });
    toast.present();
  }

}
