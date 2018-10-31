// http://abcinblog.blogspot.com/2018/05/javascript-promise.html
// http://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html
class MyPromise {            
  constructor( executor ) {
    this._status = 'pending'
    this._value =  null 

    executor( this._resolve.bind(this), 
              this._reject.bind(this) )
  }

  _resolve( value ) {
    this._status = 'fulfilled'
    this._value = value
  }

  _reject( reason ) {
    this._status = 'rejected'
    this._value = reason      
  } 

  then( onFulfilled, onRejected ) {
        
    if( this._status === "fulfilled" ) {
      
      try {
        this._value = onFulfilled( this._value ) 
      } catch(err) {
        this._value = err
        this._status = 'rejected'
      }
      return this

    }

    if ( this._status === 'rejected' ) {

      try {
        onRejected( this._value )
        this._status = 'fulfilled'  
        
      } catch(e) {
        console.log(e)
        
      }
      return this 
    }
  
  }

// не правильно отрабатывает catch. maybe
  catch( onRejected ) {    
    if (this._status === 'fulfilled') {
      console.log('функция иди просто мимо c миром')
      return this
    }   

    if ( this._status === 'rejected' ) {
      return this.then( null , onRejected )
    }
    
  }

}

const promise = new MyPromise( ( res, rej ) => res( 5 ) )

promise
  // .then( r => { throw new Error( r * r ) } )
  .catch( ( err ) => console.log(`Ошибка: ${err}`) )
  .then( r => r * r )
  .then( x => console.log( 'AFTER ALL' , x ) )

	
// Promise.reject() - возвращает отклоненное обещание.
// Promise.resolve() - возвращает разрешенное обещание.
// Promise.race() - берет массив (или любой итерабельный) и возвращает обещание, 
// 									которое разрешает со значением первого разрешенного обещания в итерируемом, 
// 									или отклоняет по причине первого обещания, которое отвергается.
// Promise.all() - берет массив (или любой итерабельный) и возвращает обещание, 
// 								которое разрешает, когда все обещания в итерируемом аргументе разрешаются, 
// 								или отклоняется по причине первого обещанного обещания, которое отклоняет.