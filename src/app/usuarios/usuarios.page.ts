import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddUsuarioPage } from './../add-usuario/add-usuario.page';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  //styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  itens: any = [];
  limit: number = 10;
  start: number = 0;
  nome: string = "";

  constructor(
    private router: Router,
    private provider: Api,
    private actRouter: ActivatedRoute,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  addUsuarios() {
    this.router.navigate(['add-usuario']);
  }

  carregar() {
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
        nome: this.nome,
        limit: this.limit,
        start: this.start
      };

      this.provider.dadosApi(dados, 'usuarios/listar.php').subscribe(data => {
        if (data['itens'] == '0') {
          this.ionViewWillEnter();
        } else {
          this.itens = [];
          for (let item of data['itens']) {
            this.itens.push(item);
          }
        }
        resolve(true);
      });
    });

  }
  ionViewWillEnter() {
    this.itens = [];
    this.start = 0;
    this.carregar();
  }

  //atualizar o list view
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  //barra de rolagem, faz o incremento do LIMIT utilizado na query de busca do listar.php
  loadData(event) {
    this.start += this.limit;
    setTimeout(() => {
      this.carregar().then(() => {
        event.target.complete();
      });
    }, 500);


  }

  editar(id: any, nome: string, cpf: string, email: string, senha: string, nivel: string) {

  }

  mostrar(id: any, nome: string, cpf: string, email: string, senha: string, nivel: string) {
    this.router.navigate(['mostrar-usuario/' + id + '/'+ nome + '/'+ cpf + '/'+ email + '/'+ senha + '/'+ nivel]);
  }

  excluir(id: any) {

  }

}
