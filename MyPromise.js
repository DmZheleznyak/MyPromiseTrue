// http://abcinblog.blogspot.com/2018/05/javascript-promise.html
class MyPromise {                 // в области видимости class ведёт себя как let
  constructor( executor ) {
    this._status = 'pending'
    this._value = null         // сохраняю значения чтобы воспользоватся ими в ф-ии
    this._reason = null       //
//  в оригинале есть массив со всеми обещаниями
    const resolve = ( value ) => {
      this._status = 'fulfilled'
      this._value = value
      return MyPromise.resolve(value)
    }

    const reject = ( reason ) => {    
      this._status = 'rejected'
      this._reason = reason
       // return this.catch
      //вернёт причину
    }
    // console.log(executor)
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {     
    // через this терятся значение value
    console.log("MyPromise._VALUE IN THEN -:-", MyPromise._value)
    console.log("onFulfilled IN THEN -:-", onFulfilled )

    if (this._status === 'fulfilled') 
      return MyPromise.resolve( onFulfilled(MyPromise._value) )

    if (this._status === 'rejected') 
      return MyPromise.reject( onRejected(MyPromise._reason) )
  }

  catch(err) {                        // реализовать try , catch
    try {
      throw new Error(err)
    } catch (err) {
      console.log(`Ошибка: ${err}`)
    }
  } 

  finally( fn ) { return fn() }

  static resolve(value) {
    this._value = value 
    return new MyPromise(value=>value)
  }

  static reject(reason) {
    this._reason = reason
    return new MyPromise(reason)
  }

  // static all([p1, p2, p3]) {
  //   [].map(p => if (p._status === 'fulfilled') return [].push(p) )
  //   // если одно из обещаний будет отклонено, вернётся отмена , то есть вызов reject
  // }
  
  
  static race() {}

}

const promise = new MyPromise( ( res, rej ) => res(5) )
promise.then( a => a * a).then(x=>console.log(x))

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