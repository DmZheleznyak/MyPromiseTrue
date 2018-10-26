// http://abcinblog.blogspot.com/2018/05/javascript-promise.html
// http://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html
class MyPromise {                 // в области видимости class ведёт себя как let
  constructor( executor ) {
    this._status = 'pending'
    this._value =  null     // сохраняю значения чтобы воспользоватся ими в ф-ии
    // this._reason = null

    const _resolve = value => {
      this._status = 'fulfilled'
      this._value = value
    }

    const _reject = reason => {
      this._status = 'rejected'
      this._value = reason      
    }       

    executor(_resolve, _reject)
  }

  then(onFulfilled, onRejected) {     
    if( this._status === "fulfilled") {
      try {
        this._value = onFulfilled( this._value ) 
        return this
      } catch(err) {
        console.log(`ERROR.MESSAGE IN CATCH ONFULFILLED`, err.message)
        return this
      }
    }

    // if ( this._status === 'rejected') {
    //   // this._reason = onRejected( this._reason )
    //   return this
    // }
    
  }

  catch(onRejected) {                   
    this.then(null , onRejected)
  }
}

const promise = new MyPromise( ( res, rej ) => res(5) )

promise
  .then(r => {
    throw new Error(r * r)
  })
  .catch( (err) => console.log(err) ) // реализовать catch пропустить эстафету не взирая на ошибку
  .then(r => r * r)
  .then( x => console.log('AFTER ALL', x ) )
  // .catch( err => console.log(err) )  // <- здесь прописываем обработчик ошибки
 

	
// MyPromise.resolve("hello")

// function showName(name) {
// 	if (name !== 'Dima') {
// 		throw new Error('Gde Dima?')
// 	}
	
// 	alert('Zdarova Dimon!');
//  }
 
//  try {
// 	showName('Dima');
//  } catch (err) {
// 	 alert(`Произошла какая-то ошибка с сообщением: ${err.message}`)
//  }

// promise.then( a => a + 2 ).then(x=>console.log(x))
// function myPromise() {}
// pr = new myPromise((res, rej) => {
//   res(5)
// })
// pr.then( a => console.log(a))

// promise.then( a => a + 2 ).then(x=>console.log(x))
// function myPromise() {}
// pr = new myPromise((res, rej) => {
//   res(5)
// })
// pr.then( a => console.log(a))

// Promise.reject() - возвращает отклоненное обещание.
// Promise.resolve() - возвращает разрешенное обещание.
// Promise.race() - берет массив (или любой итерабельный) и возвращает обещание, 
// 									которое разрешает со значением первого разрешенного обещания в итерируемом, 
// 									или отклоняет по причине первого обещания, которое отвергается.
// Promise.all() - берет массив (или любой итерабельный) и возвращает обещание, 
// 								которое разрешает, когда все обещания в итерируемом аргументе разрешаются, 
// 								или отклоняется по причине первого обещанного обещания, которое отклоняет.