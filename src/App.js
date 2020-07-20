import React, {Component} from 'react';

import Header from './Header/index.js';
import Button from './Button/index.js';
import SearchLine from './SearchLine/index.js';
import TableStudents from './TableStudents/index.js';
import ButtonToMainPage from './ButtonToMainPage/index.js';
import AvatarChange from './AvatarChange/index.js';
import InputText from './InputText/index.js';
import CustomSelect from './CustomSelect/CustomSelect.js';

import './fonts/Geometria/stylesheet.css';
import './App.css';
import ColorSelect from './CustomSelect/ColorSelect.js';
import SortSelect from './CustomSelect/SortSelect.js'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPage: true,
      specialtyOptions: [
        "Прикладная информатика",
        "Прикладная математика",
        "Механика",
        "Математика",
        "Компьютерные науки",
        "Фундаметальная информатика"
      ],

      sortOptions: [
        "Имя",
        "Фамилия",
        "Отчество",
        "ФИО",
        "Рейтинг",
        "Возраст",
        "Любимый цвет",
      ], 

      colorsOptions: [
        '#49C2E8',
        '#E25B5B',
        '#83C872',
        '#F7FB53',
        '#000000',
        '#EFA638',
        '#rainbow',
      ],
    }
  }
  
  switchPages = (isMainPageFlag) => {
    this.setState({isMainPage: isMainPageFlag})
  }

  render() {
    return (
      <div>
        <Header />

        {this.state.isMainPage ? this.renderMainPage() : this.renderAddStudentPage()}

      </div>
    );
  }

  renderMainPage() {
    return(
      <div className="container">
        <div className="container-h2-additions">
        <h2>Студенты</h2>
          <Button label="Добавить студента" imagePath="./images/add.svg" switchPages={this.switchPages} />
        </div>
        <div className="container-tools">
          <SearchLine />
          <SortSelect options={this.state.sortOptions} selected="Имя"/>
        </div>
        <TableStudents />
      </div>
    );
  }

  renderAddStudentPage() {
    return (
      <div>
        
        <div className="container">
          <div className="container-h2-additions">
            <h2>Новый студент</h2>
          </div>
          <div className="avatarchange-container">
              <AvatarChange />
          </div>
          <div className="subcontainer-container">
            <div className="subcontainer">
              <InputText label="ФИО" placeholder="Иванов Иван Иванович" />
              <InputText label="Email" placeholder="ivanov@gmail.com" />
              <CustomSelect label="Специальность" options={this.state.specialtyOptions} selected="Выбрать"/>
              <CustomSelect label="Группа" options={["ПИ-101"]} selected="Выбрать" />
              <InputText label="Рейтинг" placeholder="0" />
              <Button label="Создать" />
            </div>
            <div className="subcontainer">
              <CustomSelect label="Пол" selected="Выбрать" options={[ "Мужской",
                                                  "Женский"]} />
              <ColorSelect label="Любимый цвет" selected="Выбрать" options={this.state.colorsOptions} type="colorSelect" />
            </div>
            <div className="subcontainer"></div>
          </div>
        </div>
        <ButtonToMainPage switchPages={this.switchPages} />
      </div>
    );
  }

}

export default App;
