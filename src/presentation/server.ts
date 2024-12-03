import path from 'node:path'
import express, { Router } from "express";
import cors from 'cors'
import { Options } from './interfaces';

export class Server {

  public readonly app = express()
  private serverListener?: any

  private readonly port: number
  private readonly routes: Router
  private readonly publicPath: string


  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options
    this.port = port
    this.routes = routes
    this.publicPath = publicPath
  }

  async start() {
    //INFO: middlewares
    this.app.use( cors({ credentials: true, origin: true }) )
    this.app.use( express.json() )
    this.app.use( express.urlencoded({ extended: true }) )

    //INFO: public folder
    this.app.use( express.static( this.publicPath ) )

    //INFO: routes
    this.app.use( this.routes )

    //INFO: spa
    this.app.get('*', (_, res) => {
      const __dirname = import.meta.dirname
      const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`)

      res.sendFile(indexPath)
    })

    //INFO: port
    this.app.listen( this.port, () => {
      console.log(`Server running on port ${ this.port }`)
    })
  }

  public close() {
    this.serverListener?.close()
  }
}
