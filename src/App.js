import React, {Component} from 'react';

import Header from './Header/index.js';
import Button from './Button/index.js';
import SearchLine from './SearchLine/index.js';
import SortButton from './SortButton/index.js';
import TableStudents from './TableStudents/index.js';
import ButtonToMainPage from './ButtonToMainPage/index.js';
import AvatarChange from './AvatarChange/index.js';
import InputText from './InputText/index.js';
import InputSelect from './InputSelect/index.js';

import './fonts/Geometria/stylesheet.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMainPage: true,
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
          <SortButton />
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
              <InputSelect label="Специальность" options={["Прикладная информатика",
                                                           "Прикладная математика",
                                                           "Механика",
                                                           "Математика",
                                                           "Компьютерные науки",
                                                           "Фундаментальная информатика"]} />
              <InputSelect label="Группа" options={["ПИ-101"]} />
              <InputText label="Рейтинг" placeholder="0" />
              <Button label="Создать" />
            </div>
            <div className="subcontainer">
              <InputSelect label="Пол" options={[ "Мужской",
                                                  "Женский"]} />
              <InputSelect label="Любимый цвет" options={[]} />
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
