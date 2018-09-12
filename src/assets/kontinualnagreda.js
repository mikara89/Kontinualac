//globalne promenljive
      Mdij=new Array();
      Tdij=new Array();
      Ndij=new Array();
      OsaStapa=new Array();
      prvoopt=true;
      txt1="Uneti podaci\n";
      redBrOpt=0;
      ukReak=new Array();
      brredova=0;         //broj redova koji se dodaju u tabeli

      var polozaj=-500;  //polozaj div elementa koji se krece
      var t;        // vremenska promenljiva za div elementa koji se krece

      daLiJePrvoOpt=true;  //ovo je promenljiva za crtanje spoljnih sila
      
// #region Classa Proste Grede
function prostagreda(rasp,tipopt,sila,udalj,duzopt)
{
   this.raspon=rasp;
   this.tipopt=tipopt;
   this.koncsila=0;
   this.polozopt=udalj;
   this.duzopt=duzopt;
   this.podopt=0;
   this.trougdesno=0;
   this.trouglevo=0;
   this.brtacakaose=500;
   this.tackeose=new Array();
   this.reakcije=new Array();
   this.Mdij=new Array();
   this.Tdij=new Array();
   this.Ndij=new Array();

     if(this.tipopt=="uprkoncsila")
     {
       this.koncsila=sila;
     }
     if(this.tipopt=="podzkoncsila")
     {
       this.koncsila=sila;
     }
     if(this.tipopt=="koncmoment")
     {
       this.koncsila=sila;
     }
     if(this.tipopt=="podopt")
     {
       this.podopt=sila;
     }
     if(this.tipopt=="trougdesno")
     {
       this.trougdesno=sila;
     }
     if(this.tipopt=="trouglevo")
     {
       this.trouglevo=sila;
     }

   for(var i=0;i<=this.brtacakaose-1;i++)
    {
      this.Mdij[i]=0;
      this.Tdij[i]=0;
      this.Ndij[i]=0;
      this.tackeose[i]=0;
    }
   
   for(var i=0;i<=2;i++)
    {
      this.reakcije[i]=0; 
    }

   //odredjivanje reakcija
     if(tipopt=="uprkoncsila")
     {
       this.reakcije[0]=this.koncsila * (this.raspon-this.polozopt) / this.raspon;
       this.reakcije[1]=0;
       this.reakcije[2]=this.koncsila * this.polozopt / this.raspon;
     }
     if(tipopt=="podzkoncsila")
     {
       this.reakcije[0]=0;
       this.reakcije[1]=-(this.koncsila);
       this.reakcije[2]=0;
     }
     if(tipopt=="koncmoment")
     {
       this.reakcije[0]= this.koncsila/ this.raspon;
       this.reakcije[1]=0;
       this.reakcije[2]=-this.koncsila / this.raspon;
     }
     if(tipopt=="podopt")
     {
       this.reakcije[0]=this.podopt * (2 * this.duzopt * (this.raspon-this.polozopt-this.duzopt) + this.duzopt * this.duzopt) / (2 * this.raspon);
       this.reakcije[1]=0;
       this.reakcije[2]=this.podopt * (2 * this.duzopt * this.polozopt + this.duzopt * this.duzopt) / (2 * this.raspon);
     }
     if(tipopt=="trougdesno")
     {
       this.reakcije[0]=this.trougdesno * (3 * this.duzopt * (this.raspon-this.polozopt-this.duzopt) + this.duzopt * this.duzopt) / (6 * this.raspon);
       this.reakcije[1]=0;
       this.reakcije[2]=this.trougdesno * (3 * this.duzopt * this.polozopt + 2 * this.duzopt * this.duzopt) / (6 * this.raspon);
     }
     if(tipopt=="trouglevo")
     {
       this.reakcije[0]=this.trouglevo * (3 * this.duzopt * (this.raspon-this.polozopt-this.duzopt) + 2 * this.duzopt * this.duzopt) / (6 * this.raspon);
       this.reakcije[1]=0;
       this.reakcije[2]=this.trouglevo * (3 * this.duzopt * this.polozopt + this.duzopt * this.duzopt) / (6 * this.raspon);
     }

  
   var dx=this.raspon/(this.brtacakaose-1);

   //odredjivanje tacaka na osi stapa
   for(var i = 0; i <= this.brtacakaose-1; i++)
   {
     this.tackeose[i]=i*dx;
   }
   //odredjivanje MTN sila usled reacija
   for (var i = 0; i <= this.brtacakaose-1; i++)
   {
      this.Mdij[i] = this.Mdij[i] - this.reakcije[0] * i * dx;
      this.Tdij[i] = this.Tdij[i] + this.reakcije[0];
      this.Ndij[i] = this.Ndij[i] - this.reakcije[1];   
   }
   
   //odredjivanje MTN sila usled opterecenja
   if(this.tipopt=="uprkoncsila")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         if (i * dx <= this.polozopt) continue;
         if (i * dx > this.polozopt)
         {
            this.Mdij[i] = this.Mdij[i] + this.koncsila * (i * dx - this.polozopt);
            this.Tdij[i] = this.Tdij[i] - this.koncsila;
         }
       }
     }
     if(this.tipopt=="podzkoncsila")
     {
      for(var i=0;i<=this.brtacakaose-1;i++)
       {
         if (i * dx <= this.polozopt) continue;
         if (i * dx > this.polozopt)
         {
            this.Ndij[i] = this.Ndij[i] - this.koncsila;
         }
       }
     }
     
     if(this.tipopt=="koncmoment")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         if (i * dx <= this.polozopt) continue;
         if (i * dx > this.polozopt)
         {
            this.Mdij[i] = this.Mdij[i] + this.koncsila;
         }
       }
     }
     if(this.tipopt=="podopt")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         var u = i * dx; var d = this.polozopt; var e = this.duzopt;
         var p = this.podopt;
         if (u <= this.polozopt) continue;
         if (u <= (this.polozopt + this.duzopt))
         {
            this.Mdij[i] = this.Mdij[i] + p * (u - d) * (u - d) / 2;
            this.Tdij[i] = this.Tdij[i] - this.podopt * (i * dx - this.polozopt);
            continue;
         }
         if (u > (this.polozopt + this.duzopt))
            {
              this.Mdij[i] = this.Mdij[i] + p * e * (u - d - (e / 2));
              this.Tdij[i] = this.Tdij[i] - this.podopt * this.duzopt;
            }
       }
     }
     if(this.tipopt=="trougdesno")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         var u = i * dx; var d = this.polozopt; var e = this.duzopt;
         var p = this.trougdesno;
         if (u <= this.polozopt) continue;
         if (u <= (this.polozopt + this.duzopt))
         {
            this.Mdij[i] = this.Mdij[i] + p * (u - d) * (u - d) * (u - d) / (6 * e);
            this.Tdij[i] = this.Tdij[i] - p * (u - d) * (u - d) / (2 * e);
            continue;
         }
         if (u > (this.polozopt + this.duzopt))
            {
              this.Mdij[i] = this.Mdij[i] + p * (3 * u * e - 3 * e * d - 2 * e * e) / 6;
              this.Tdij[i] = this.Tdij[i] - p * e / 2;
            }
       }
     }
     if(this.tipopt=="trouglevo")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         var u = i * dx; var d = this.polozopt; var e = this.duzopt;
         var p = this.trouglevo;
         if (u <= this.polozopt) continue;
         if (u <= (this.polozopt + this.duzopt))
         {
            var x = p * (d + e - u) / e;
            this.Mdij[i] = this.Mdij[i] + x * (u - d) * (u - d) / 2 + (p - x) * (u - d) * (u - d) / 3;
            this.Tdij[i] = this.Tdij[i] - x * (u - d) - (p - x) * (u - d) / 2;
            continue;
         }
         if (u > (this.polozopt + this.duzopt))
            {
              this.Mdij[i] = this.Mdij[i] + p * e * (u - d - e / 3) / 2;
              this.Tdij[i] = this.Tdij[i] - p * e / 2;
            }
       }
     }
   
}//kraj klase prostagreda
// #endregion       
 
// #region Classa Matrice

function matrica(brvrsta,brkol)
{
  this.brojVrsta=brvrsta;
  this.brojKol=brkol;

  this.trenutElem=new Array();
    this.trenutElem[0]=0;
    this.trenutElem[1]=0;

  this.linNiz=new Array();
  for(var i=0;i<=(this.brojVrsta*this.brojKol)-1;i++)
  {
    this.linNiz[i]=0;
  }

  this.getElem=getElem;
  
  function getElem(i1,j1)
  {
    var poloz=i1*this.brojKol+j1;
    this.trenutElem[0]=i1;
    this.trenutElem[1]=j1;
    return this.linNiz[poloz];
  }   

  this.setElem=setElem;

  function setElem(i1,j1,vred)
  {
    var poloz=i1*this.brojKol+j1;
    this.linNiz[poloz]=vred;
    this.trenutElem[0]=i1;
    this.trenutElem[1]=j1;
  }

  this.saberiSa=saberiSa;

  function saberiSa(a)
  {
    var b=new matrica(this.brojVrsta,this.brojKol);
    for(var i=0;i<=(this.brojVrsta*this.brojKol)-1;i++)
    {
       b.linNiz[i]=this.linNiz[i]+a.linNiz[i];
    }
    return b;
  }

  this.pomnoziSa=pomnoziSa;

  function pomnoziSa(a)
  {
    var b=new matrica(this.brojVrsta,a.brojKol);
    for (var i = 0; i <= this.brojVrsta-1; i++)
    {
       for (var j = 0; j <= a.brojKol-1; j++)
       {
           var s = 0;
           for (var u = 0; u <= this.brojKol-1; u++)
           {
               s = s + this.getElem(i, u) * a.getElem(u, j);
           }
           b.setElem(i, j, s);
       }
    }
    return b;
  }

  this.transponuj=transponuj;

  function transponuj()
  {
    var b=new matrica(this.brojVrsta,this.brojKol);
    for (var i = 0; i <= this.brojVrsta-1; i++)
    {
       for (var j = 0; j <= this.brojKol-1; j++)
       {
           var v=this.getElem(j, i);
           b.setElem(i, j, v);
       }
    }
    return b;
  }
 
}   //kraj klase matrica

// #endregion

// #region Classa Kontinualne Grede
/**
 * 
 * @param {Number} broslonaca 
 * @param {Any[]} nizrasp 
 * @param {string} tipopt 
 * @param {Number} sila 
 * @param {Number} polozopt 
 * @param {Number} duzopt 
 */
let kontinualnagreda=function kontinualnagreda(broslonaca,nizrasp,tipopt,sila,polozopt,duzopt)
{


   this.brojoslonaca=broslonaca;
   this.nizraspona=new Array();


    for(var i=0;i<=nizrasp.length-1;i++)
    {
      this.nizraspona[i]=new Number(nizrasp[i]);
    }

   this.ukupniraspon=0;
    for(var i=0;i<=this.nizraspona.length-1;i++)
    {
      this.ukupniraspon = this.ukupniraspon + this.nizraspona[i];
    }


   this.tipopt=tipopt;
   this.koncsila=0;
   this.polozopt=polozopt;
   this.duzopt=duzopt;
   this.podopt=0;
   this.trougdesno=0;
   this.trouglevo=0;
   this.brtacakaose=500;
   this.tackeose=new Array();
   this.nizstatnepoz=new Array();
   this.reakcije=new Array();
   this.Mdij=new Array();
   this.Tdij=new Array();
   this.Ndij=new Array();
 
  // this.reakcije[0] je vert.reak.nepokretnog oslonca
  // this.reakcije[1] je horiz.reak.nepokretnog oslonca
  // this.reakcije[2] je vert.reak.pokretnog oslonca
  // this.reakcije[3] je vert.reak.pokretnog oslonca
  // this.reakcije[4] je vert.reak.pokretnog oslonca
  // this.reakcije[5] je vert.reak.pokretnog oslonca
  //  ITD.


     if(this.tipopt=="uprkoncsila")
     {
       this.koncsila=sila;
     }
     if(this.tipopt=="podzkoncsila")
     {
       this.koncsila=sila;
     }
     if(this.tipopt=="koncmoment")
     {
       this.koncsila=sila;
     }
     if(this.tipopt=="podopt")
     {
       this.podopt=sila;
     }
     if(this.tipopt=="trougdesno")
     {
       this.trougdesno=sila;
     }
     if(this.tipopt=="trouglevo")
     {
       this.trouglevo=sila;
     }

   for(var i=0;i<=this.brtacakaose-1;i++)
    {
      this.Mdij[i]=0;
      this.Tdij[i]=0;
      this.Ndij[i]=0;
      this.tackeose[i]=0;
    }
   
   for(var i=0;i<=this.brojoslonaca;i++)
    {
      this.reakcije[i]=0;
    }

   var dx=this.ukupniraspon/(this.brtacakaose-1);


 
 //ODREDJIVANJE REAKCIJA
   //odredjivanje pomeranja delta 
       var nizDelta = new matrica(this.brojoslonaca - 1, this.brojoslonaca - 1);
       var polozsile1=0;

       for (var i = 0; i <= this.brojoslonaca - 2; i++)
       {
           var Ma=new Array();
           if(i==0)
           {
             //pravljenje osnov.sistema na kome deluje spolj.opterecenje
               var gredaNULA = new prostagreda(this.ukupniraspon,this.tipopt,sila,this.polozopt,this.duzopt);
               Ma=gredaNULA.Mdij;
           }
           if(i!=0)
           {
             polozsile1=polozsile1+this.nizraspona[i-1];
             var greda1=new prostagreda(this.ukupniraspon,"uprkoncsila",-1,polozsile1,0);
             Ma=greda1.Mdij;
           }
          
           var polozsile2=0;
           for (var j = 0; j <= this.brojoslonaca - 2; j++)
           {
              var Mb=new Array();
              if(j==0)
              {
                 //pravljenje osnov.sistema na kome deluje spolj.opterecenje
                  var gredaNULA = new prostagreda(this.ukupniraspon,this.tipopt,sila,this.polozopt,this.duzopt);
                  Mb=gredaNULA.Mdij;
              }
              if(j!=0)
              {
                polozsile2=polozsile2+this.nizraspona[j-1];
                var greda2=new prostagreda(this.ukupniraspon,"uprkoncsila",-1,polozsile2,0);
                Mb=greda2.Mdij;
              }

               for (var k = 0; k <= this.brtacakaose - 2; k++)
               {
                   var a;var b;var v;
                   a = (Ma[k] + Ma[k + 1]) / 2;
                   b = (Mb[k] + Mb[k + 1]) / 2;
                   v=nizDelta.getElem(i, j) + a * b * dx;
                   nizDelta.setElem(i, j, v);
               }
           }
       }


     //pravljenje sistema jednacina
     var Sist = new matrica(this.brojoslonaca-2, this.brojoslonaca-2);
     var Slob = new matrica(this.brojoslonaca-2,1);
     for (var i = 1; i <= this.brojoslonaca - 2; i++)
     {
         for (var j = 1; j <= this.brojoslonaca - 2; j++)
         {
             Sist.setElem(i - 1, j-1, nizDelta.getElem(i, j));
         }
     }
     for (var i = 1; i <= this.brojoslonaca - 2; i++)
     {
         Slob.setElem(i-1,0,nizDelta.getElem(0, i));
     }


   //resavanje sistema j-na
     var resenje = resavanjeSistema(Sist, Slob);
     for(var i=0;i<=this.brojoslonaca-3;i++)
     {
        this.nizstatnepoz[i]=resenje.getElem(i,0);
     }

    //odredjivanje krajnje leve vertik.reakcije na kontinualnoj gredi usled spolj.opt.
       var gredaX0 = new prostagreda(this.ukupniraspon,this.tipopt,sila,this.polozopt,this.duzopt);
       this.reakcije[0] = gredaX0.reakcije[0]; 
       var d = 0;
       var polozsile=0;
    //odredjivanje krajnje leve vertik.reakcije usled staticki nepoznatih
       for (var i = 1; i <= this.brojoslonaca - 2; i++)
       {
          polozsile=polozsile+this.nizraspona[i-1];
          var gredaA=new prostagreda(this.ukupniraspon,"uprkoncsila",-1,polozsile,0);          
           this.reakcije[0] = this.reakcije[0] + gredaA.reakcije[0] * (-1) * this.nizstatnepoz[d];
           d++;
       }

    //odredjivanje krajnje horizontalne leve reakcije na kontinualnoj gredi usled spolj.opt
       this.reakcije[1] = gredaX0.reakcije[1];
    

    //odredjivanje krajnje desne vertik.reakcije na kontinualnoj gredi usled spolj.opt.
       this.reakcije[this.brojoslonaca] = gredaX0.reakcije[2];
       d = 0;
       polozsile=0;
       //odredjivanje desne vertik.reakcije usled staticki nepoznatih
       for (var i = 1; i <= this.brojoslonaca - 2; i++)
       {
           polozsile=polozsile+this.nizraspona[i-1];
          var gredaB=new prostagreda(this.ukupniraspon,"uprkoncsila",-1,polozsile,0);
           this.reakcije[this.brojoslonaca] = this.reakcije[this.brojoslonaca] + gredaB.reakcije[2] * (-1) * this.nizstatnepoz[d];
           d++;
       }

  
    //odredjivanje reakcija na ukinutim osloncima
       for (var h = 2; h <= this.brojoslonaca - 1; h++)
       {
           this.reakcije[h] = (-1) * this.nizstatnepoz[h - 2];
       }

   //odredjivanje tacaka na osi stapa
   for(var i = 0; i <= this.brtacakaose-1; i++)
   {
     this.tackeose[i]=i*dx;
   }

//ODREDJIVANJE MTN SILA USLED REAKCIJA OSLONACA
   //odredjivanje N sila usled reacija oslonaca
      for (var i = 0; i <= this.brtacakaose-1; i++)
      {          
         this.Ndij[i] = this.Ndij[i] - this.reakcije[1];   
      }

   //T sile usled vertikalnih reakcija oslonaca (reakcija poslednjeg oslonca nije uzeta u obzir)
       for (var i = 0; i <= this.brtacakaose - 1; i++)
       {
          var x = i * dx;
          this.Tdij[i] = this.Tdij[i] + this.reakcije[0];
       }
       polozsile=0;
       for (var j = 2; j <= this.reakcije.length-2; j++)
       {
          polozsile=polozsile+this.nizraspona[j-2];
          for (var i = 0; i <= this.brtacakaose - 1; i++)
          {
              var x = i * dx;
              if (x < polozsile) continue;
              this.Tdij[i] = this.Tdij[i] + this.reakcije[j];
          }
       }

   //momenti usled vertikalnih reakcija oslonaca (reakcija poslednjeg oslonca nije uzeta u obzir)
       for (var i = 0; i <= this.brtacakaose - 1; i++)
       {
          var x = i * dx;
          this.Mdij[i] = this.Mdij[i] - this.reakcije[0] * x;
       }
       polozsile=0;
       for (var j = 2; j <= this.reakcije.length-2; j++)
       {
          polozsile=polozsile+this.nizraspona[j-2];
          for (var i = 0; i <= this.brtacakaose - 1; i++)
          {
              
              var x = i * dx;
              if (x < polozsile) continue;
              this.Mdij[i] = this.Mdij[i] - this.reakcije[j] * (x - polozsile);
          }
       }


   //odredjivanje MTN sila usled opterecenja
   if(this.tipopt=="uprkoncsila")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         if (i * dx <= this.polozopt) continue;
         if (i * dx > this.polozopt)
         {
            this.Mdij[i] = this.Mdij[i] + this.koncsila * (i * dx - this.polozopt);
            this.Tdij[i] = this.Tdij[i] - this.koncsila;
         }
       }
     }
     if(this.tipopt=="podzkoncsila")
     {
      for(var i=0;i<=this.brtacakaose-1;i++)
       {
         if (i * dx <= this.polozopt) continue;
         if (i * dx > this.polozopt)
         {
            this.Ndij[i] = this.Ndij[i] - this.koncsila;
         }
       }
     }
     
     if(this.tipopt=="koncmoment")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         if (i * dx <= this.polozopt) continue;
         if (i * dx > this.polozopt)
         {
            this.Mdij[i] = this.Mdij[i] + this.koncsila;
         }
       }
     }
     if(this.tipopt=="podopt")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         var u = i * dx; var d = this.polozopt; var e = this.duzopt;
         var p = this.podopt;
         if (u <= this.polozopt) continue;
         if (u <= (this.polozopt + this.duzopt))
         {
            this.Mdij[i] = this.Mdij[i] + p * (u - d) * (u - d) / 2;
            this.Tdij[i] = this.Tdij[i] - this.podopt * (i * dx - this.polozopt);
            continue;
         }
         if (u > (this.polozopt + this.duzopt))
            {
              this.Mdij[i] = this.Mdij[i] + p * e * (u - d - (e / 2));
              this.Tdij[i] = this.Tdij[i] - this.podopt * this.duzopt;
            }
       }
     }
     if(this.tipopt=="trougdesno")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         var u = i * dx; var d = this.polozopt; var e = this.duzopt;
         var p = this.trougdesno;
         if (u <= this.polozopt) continue;
         if (u <= (this.polozopt + this.duzopt))
         {
            this.Mdij[i] = this.Mdij[i] + p * (u - d) * (u - d) * (u - d) / (6 * e);
            this.Tdij[i] = this.Tdij[i] - p * (u - d) * (u - d) / (2 * e);
            continue;
         }
         if (u > (this.polozopt + this.duzopt))
            {
              this.Mdij[i] = this.Mdij[i] + p * (3 * u * e - 3 * e * d - 2 * e * e) / 6;
              this.Tdij[i] = this.Tdij[i] - p * e / 2;
            }
       }
     }
     if(this.tipopt=="trouglevo")
     {
       for(var i=0;i<=this.brtacakaose-1;i++)
       {
         var u = i * dx; var d = this.polozopt; var e = this.duzopt;
         var p = this.trouglevo;
         if (u <= this.polozopt) continue;
         if (u <= (this.polozopt + this.duzopt))
         {
            var x = p * (d + e - u) / e;
            this.Mdij[i] = this.Mdij[i] + x * (u - d) * (u - d) / 2 + (p - x) * (u - d) * (u - d) / 3;
            this.Tdij[i] = this.Tdij[i] - x * (u - d) - (p - x) * (u - d) / 2;
            continue;
         }
         if (u > (this.polozopt + this.duzopt))
            {
              this.Mdij[i] = this.Mdij[i] + p * e * (u - d - e / 3) / 2;
              this.Tdij[i] = this.Tdij[i] - p * e / 2;
            }
       }
     }

}      //kraj klase kontinualnagreda
// #endregion

// #region Classa Resavanje Sistema
function resavanjeSistema(matricaSis, vektor)
{
       var A;
       var n = matricaSis.brojVrsta;
       var a = new matrica(n, n + 1);
       for (var i = 0; i <= n-1; i++)
       {
           for (var j = 0; j <= n-1; j++)
           {
               a.setElem(i, j,matricaSis.getElem(i, j));
           }
       }
       for (var i = 0; i <= n-1; i++)
       {
           a.setElem(i, n,vektor.getElem(i,0));
       }
       //pravljenje element.transformacija
       //da se dobije trougaona matrica
       for (var i = 0; i <= n - 2; i++)
       {
           for (var k = i + 1; k <= n-1; k++)
           {
               if (a.getElem(k, i) == 0) continue;
               A = a.getElem(k, i) / a.getElem(i, i);
               for (var j = i; j <= n; j++)
               {
                   a.setElem(i, j,a.getElem(i, j) * A);
               }
               for (var j = i; j <= n; j++)
               {
                   a.setElem(k, j,a.getElem(i, j) - a.getElem(k, j));
               }
           }
       }

       

       //resavanje trougaone matrice
       var sx;
       var X = new matrica(n,1);
       X.setElem(n-1,0,a.getElem(n-1, n) / a.getElem(n-1, n-1));
       for (var i = n - 2; i >= 0; i--)
       {
           sx = 0;
           for (var j = n-1; j >= i + 1; j--)
           {
               sx = sx + X.getElem(j,0) * a.getElem(i, j);
           }
           X.setElem(i,0,(a.getElem(i, n) - sx) / a.getElem(i, i));
       }
       return X;
}

//#endregion


     


   
      function proracunSila()
      {
        //provera da li je uneto neko opterecenje tj. da li je popunjen textBox sila
       if(document.getElementById("sila").value==0)
       {
         alert("Morate uneti vrednost sile");
         return;
       }
       

        try
        {
         //UKLANJANJE DIV za prikaz pomeranja ako je ostao otvoren od PREDHODNOG PRORACUNA
           document.getElementById("divpomeranja").className="nestani";

           //brisanje tabele pomeranja
           var tabla1=document.getElementById("tabelapomeranja");
           //sada se stara tabela brise
           if(document.getElementById("tabelapomeranja").rows.length==501)
           {
             for(var i=0;i<=499;i++)
             {
               tabla1.deleteRow(-1);
             }
           }

           //brisanje dijagrama pomeranja
           c=document.getElementById("slikapomeranja");
           ctx=c.getContext("2d");
           //brisanje predhodno nacrtanog crteza pomeranja
           ctx.clearRect(0,0,650,250);
        }
        catch(err)
        {
         alert("Vaš browser ne podržava canvas elemente. Zbog toga vam nisu dostupni dijagrami.");
        }

      try
      {
        var pisanjeraspona=false;
        redBrOpt++;               //prebrojava koje je opterecenje po redu

        var broslonaca=new Number(document.getElementById("brosl").value);

       //provera da li je broj oslonaca izmedju 3 i 25
        if((broslonaca<3)|(broslonaca>15))
        {
          alert("Minimalni broj oslonaca je 3, a maksimalni broj oslonaca je 15.");
          return;
        }

        var nizraspona=new Array();   
        var brclanova;
        var a;var b;
        var nizpomocni=new Array();

        a = new String(document.getElementById("rasp").value);
        b = a.toLowerCase();
        nizpomocni = b.split(",");
        brclanova = nizpomocni.length;

        for (var i = 0; i <= brclanova - 1; i++)
        {
           nizraspona[i] = new Number(nizpomocni[i]);
        }


        //Ako je prvo poterecenje onda ovo odradi
        if(prvoopt==true)
        {
         for(var i=0;i<=499;i++)
         {
           Mdij[i]=0;
           Tdij[i]=0;
           Ndij[i]=0;
           OsaStapa[i]=0;
           pisanjeraspona=true;
         }
         //inicijalizovanje niza reakcija oslonaca
         for(var i=0;i<=broslonaca;i++)
         {
           ukReak[i]=0;
         }
         
         prvoopt=false;
        
        }

       
        document.getElementById("rasp").disabled=true;
        document.getElementById("brosl").disabled=true;

       //provera da li broj oslonaca odgovara broju unetih raspona
        if(!(broslonaca==nizraspona.length+1))
        {
           alert("Uneti broj oslonaca neodgovara unetom nizu raspona");
           return;
        }
       
       
        
        var ukraspon=0;
        for (var i = 0; i <= nizraspona.length - 1; i++)
        {
           //provera da li je uneti raspon broj
            if(isNaN(nizraspona[i]))
            {
              alert("Raspon mora biti pozitivan broj.Proverite unete vrednosti raspona.");
              document.getElementById("rasp").disabled=false;
              redBrOpt--;
              return;
            }
           //provera da li je raspon pozitivan broj
            if(nizraspona[i]<=0)
            {
              alert("Raspon mora biti pozitivan broj.Proverite unete raspone.");
              document.getElementById("rasp").disabled=false;
              redBrOpt--;
              return;
            }
           ukraspon = ukraspon+nizraspona[i];
        }

        var tipopt="uprkoncsila";
        var sila=0;        //promenljiva koja sluzi kao parametar konstruktora kontinualnagreda
        var koncsila=0;
        var polozopt=0;
        var duzopt=0;
        var podopt=0;
        var trougoptD=0;
        var trougoptL=0;
        var selInd=document.getElementById("tipopt").selectedIndex;
        switch (selInd)
        {
         case 0:
          tipopt="uprkoncsila";
          koncsila=new Number(document.getElementById("sila").value);
          polozopt=new Number(document.getElementById("polozopt").value);
          sila=koncsila;
          break;
         case 1:
          tipopt="podzkoncsila";
          koncsila=new Number(document.getElementById("sila").value);
          polozopt=new Number(document.getElementById("polozopt").value);
          sila=koncsila;
          break;
         case 2:
          tipopt="koncmoment";
          koncsila=new Number(document.getElementById("sila").value);
          polozopt=new Number(document.getElementById("polozopt").value);
          sila=koncsila;
          break;
         case 3:
          tipopt="podopt";
          polozopt=new Number(document.getElementById("polozopt").value);
          duzopt=new Number(document.getElementById("duzopt").value);
          podopt=new Number(document.getElementById("sila").value);
          sila=podopt;
          break;
         case 4:
          tipopt="trougdesno";
          polozopt=new Number(document.getElementById("polozopt").value);
          duzopt=new Number(document.getElementById("duzopt").value);
          trougdesno=new Number(document.getElementById("sila").value);
          sila=trougdesno;
          break;
         case 5:
          tipopt="trouglevo";
          polozopt=new Number(document.getElementById("polozopt").value);
          duzopt=new Number(document.getElementById("duzopt").value);
          trouglevo=new Number(document.getElementById("sila").value);
          sila=trouglevo;
          break;
        }

        
        //provera da li je uneto udaljenje opterecenja od levog kraja broj
        if(isNaN(polozopt))
        {
          alert("Podaci o opterećenju nisu pravilno uneti.Proverite uneto udaljenje opterećenja od uklještenja.(mora biti pozitivan broj).");
          redBrOpt--;
          return;
        }
        //provera da li je uneta duzina opterecenja broj
        if(isNaN(duzopt))
        {
          alert("Podaci o opterećenju nisu pravilno uneti.Proverite unetu dužinu opterećenja.(mora biti pozitivan broj).");
          redBrOpt--;
          return;
        }
        //provera da li je uneta vrednost sile broj
        var s=new Number(document.getElementById("sila").value);
        if(isNaN(s))
        {
          alert("Podaci o opterećenju nisu pravilno uneti.Proverite unetu vrednost sile.(mora biti pozitivan broj).");
          redBrOpt--;
          return;
        }

        
        //provera da li su uneti podaci o opterecenju pozitivni brojevi
        if(polozopt<0)
        {
          alert("Podaci o opterećenju nisu pravilno uneti. Sve unete vrednosti moraju biti brojevi veći ili jednaki nuli");
          redBrOpt--;
          return;
        }
        if(duzopt<0)
        {
          alert("Podaci o opterećenju nisu pravilno uneti. Sve unete vrednosti moraju biti brojevi veći ili jednaki nuli");
          redBrOpt--;
          return;
        }
           
        //PROVERA da li opterecenje deluje van nosaca  
        if(ukraspon<(polozopt+duzopt))
        {
          alert("Podaci o opterećenju nisu pravilno uneti. Opterećenje ne sme delovati van nosača");
          redBrOpt--;
          return;
        }
        

        
        var mojaGreda=new kontinualnagreda(broslonaca,nizraspona,tipopt,sila,polozopt,duzopt);

        //odredjivanje ukupnih reakcija od svog opterecenja
        for(var i=0;i<=broslonaca;i++)
        {
          ukReak[i]=ukReak[i]+mojaGreda.reakcije[i];
        }
        
 
        var dx=mojaGreda.ukupniraspon/499;

        //odredjivanje tacaka na osi stapa
        for(var i = 0; i <= 499; i++)
        {
          OsaStapa[i]=i*dx;
        }
    
        //odredjivanje MTN sila usled ukupnog opterecenja
        //sada se MTN dijagram od trenutne grede dodaje na vec postojeci, od predhodnih opterecenja
        for (var i = 0; i <= 499; i++)
        {
           Mdij[i] = Mdij[i] + mojaGreda.Mdij[i];
           Tdij[i] = Tdij[i] + mojaGreda.Tdij[i];
           Ndij[i] = Ndij[i] + mojaGreda.Ndij[i];   
        }


        //kada su odredjeni mtn dijagrami dozvoliti dugme za proracun pomeranja
        document.getElementById("dugmezapomeranja").disabled=false;

   // TABELA
        var tabla1=document.getElementById("tabelarezultata");

        //sada se stara tabela brise
        if(document.getElementById("tabelarezultata").rows.length==brredova+1)
        {
          for(var i=0;i<=brredova-1;i++)
          {
            tabla1.deleteRow(-1);
          }
        }
   
        //sada se pravi niz koji cuva indekse gde se javljaju ekstremi presecnih sila
        var nizredbr=new Array();
        nizredbr[0]=0;
        var indeks=1;

        for(var i=1;i<=498;i++)
        {
          if(((Math.abs(Mdij[i-1])<=Math.abs(Mdij[i]))&(Math.abs(Mdij[i])>Math.abs(Mdij[i+1])))|((Math.abs(Mdij[i-1])<Math.abs(Mdij[i]))&(Math.abs(Mdij[i])>=Math.abs(Mdij[i+1])))|((Math.abs(Mdij[i-1])>=Math.abs(Mdij[i]))&(Math.abs(Mdij[i])<Math.abs(Mdij[i+1])))|((Math.abs(Mdij[i-1])>Math.abs(Mdij[i]))&(Math.abs(Mdij[i])<=Math.abs(Mdij[i+1]))))
          {
              nizredbr[indeks]=i;
              indeks++;
              continue;
          }
          if(((Math.abs(Tdij[i-1])<=Math.abs(Tdij[i]))&(Math.abs(Tdij[i])>Math.abs(Tdij[i+1])))|((Math.abs(Tdij[i-1])<Math.abs(Tdij[i]))&(Math.abs(Tdij[i])>=Math.abs(Tdij[i+1])))|((Math.abs(Tdij[i-1])>=Math.abs(Tdij[i]))&(Math.abs(Tdij[i])<Math.abs(Tdij[i+1])))|((Math.abs(Tdij[i-1])>Math.abs(Tdij[i]))&(Math.abs(Tdij[i])<=Math.abs(Tdij[i+1]))))
          {
              nizredbr[indeks]=i;
              indeks++;
              continue;
          }
          if(((Math.abs(Ndij[i-1])<=Math.abs(Ndij[i]))&(Math.abs(Ndij[i])>Math.abs(Ndij[i+1])))|((Math.abs(Ndij[i-1])<Math.abs(Ndij[i]))&(Math.abs(Ndij[i])>=Math.abs(Ndij[i+1])))|((Math.abs(Ndij[i-1])>=Math.abs(Ndij[i]))&(Math.abs(Ndij[i])<Math.abs(Ndij[i+1])))|((Math.abs(Ndij[i-1])>Math.abs(Ndij[i]))&(Math.abs(Ndij[i])<=Math.abs(Ndij[i+1]))))
          {
              nizredbr[indeks]=i;
              indeks++;
              continue;
          }
        }
        nizredbr[indeks]=499;

        brredova=nizredbr.length;      

        //sada se ukupni dijagrami ispisuju u tabelu - samo tacke gde su ekstremi
        var redbrtackeose=0;
        for(var i=0;i<=brredova-1;i++)
        {
          var red=tabla1.insertRow(-1);
          var cel1=red.insertCell(0);
          var cel2=red.insertCell(1);
          var cel3=red.insertCell(2);
          var cel4=red.insertCell(3);
          var cel5=red.insertCell(4);
          cel1.innerHTML=i+1;
          redbrtackeose=nizredbr[i];
          cel2.innerHTML=OsaStapa[redbrtackeose].toFixed(5);
          cel3.innerHTML=Ndij[redbrtackeose].toFixed(5);
          cel4.innerHTML=Tdij[redbrtackeose].toFixed(5);
          cel5.innerHTML=Mdij[redbrtackeose].toFixed(5);
        }



        //brisanje podataka o opterecenju iz textBox-ova
        document.getElementById("sila").value="";
        document.getElementById("polozopt").value="";
        document.getElementById("duzopt").value="";
          
        //unos podataka u textarea
        var txt2="";
        var txt3="";
        var txt4="";
        var txtSpisak="";
        if(pisanjeraspona==true)
        {
          txt2="rasponi:";
          for(var i=0;i<=mojaGreda.nizraspona.length-2;i++)
          {
             txt3=txt3.concat(mojaGreda.nizraspona[i].toString(),",");
          }
          txt3=txt3.concat(mojaGreda.nizraspona[mojaGreda.nizraspona.length-1].toString());
 
          txt4="\n";
          txtSpisak="SPISAK OPTEREĆENJA\n";
        }
        
        var txt4a="REDNI BROJ OPTEREĆENJA:";
        var txt4b=redBrOpt.toString();
        var txt4c="\n";
        var txt5="tip opterećenja:";
        var txt6="";var txt7="";var txt8="";var txt9="";var txt10="";var txt11="";
        var txt12="";var txt13="";var txt14="";var txt15="";var txt16="";
        if(tipopt=="uprkoncsila")
          {
            txt6="upravna konc.sila";
            txt7="\n";
            txt8="vrednost sile:";
            txt9=koncsila.toString();
            txt10="\n";
            txt11="udaljenje sile od levog kraja grede:";
            txt12=polozopt.toString();
            txt13="\n";
          }
          if(tipopt=="podzkoncsila")
          {
            txt6="podužna konc.sila";
            txt7="\n";
            txt8="vrednost sile:";
            txt9=koncsila.toString();
            txt10="\n";
            txt11="udaljenje sile od levog kraja grede:";
            txt12=polozopt.toString();
            txt13="\n";
          }
          
          if(tipopt=="koncmoment")
          {
            txt6="koncentrisani momenat";
            txt7="\n";
            txt8="vrednost momenta:";
            txt9=koncsila.toString();
            txt10="\n";
            txt11="udaljenje sile od levog kraja grede:";
            txt12=polozopt.toString();
            txt13="\n";
          }
          if(tipopt=="podopt")
          {
            txt6="ravnomerno podeljeno opt.";
            txt7="\n";
            txt8="vrednost sile:";
            txt9=podopt.toString();
            txt10="\n";
            txt11="udaljenje sile od levog kraja grede:";
            txt12=polozopt.toString();
            txt13="\n";
            txt14="dužina opterećenja:";
            txt15=duzopt.toString();
            txt16="\n";
          }
          if(tipopt=="trougdesno")
          {
            txt6="trougaono opt.desno";
            txt7="\n";
            txt8="vrednost sile:";
            txt9=trougdesno.toString();
            txt10="\n";
            txt11="udaljenje sile od levog kraja grede:";
            txt12=polozopt.toString();
            txt13="\n";
            txt14="dužina opterećenja:";
            txt15=duzopt.toString();
            txt16="\n";
          }
          if(tipopt=="trouglevo")
          {
            txt6="trougaono opt.levo";
            txt7="\n";
            txt8="vrednost sile:";
            txt9=trouglevo.toString();
            txt10="\n";
            txt11="udaljenje sile od levog kraja grede:";
            txt12=polozopt.toString();
            txt13="\n";
            txt14="dužina opterećenja:";
            txt15=duzopt.toString();
            txt16="\n";
          }


        txt1=txt1.concat(txt2,txt3,txt4,txtSpisak,txt4a,txt4b,txt4c,txt5,txt6,txt7,txt8,txt9,txt10,txt11,txt12,txt13,txt14,txt15,txt16);
        document.getElementById("tekst").innerHTML=txt1;

        

        document.getElementById("r0").innerHTML="REAKCIJE OSLONACA USLED UKUPNOG OPTEREĆENJA";

        var txtRa="vert.reakcija nepokretnog oslonca:R1=";
        var txtRb=ukReak[0].toFixed(5).toString();
        txtRa=txtRa.concat(txtRb);
        var txtRc="horiz.reakcija nepokretnog oslonca:R2=";
        var txtRd=ukReak[1].toFixed(5).toString();
        txtRa=txtRa.concat("<br>",txtRc,txtRd);
        var txtRe="vert.reakcije pokretnih oslonaca:";
        txtRa=txtRa.concat("<br>",txtRe);
        for(var i=2;i<=ukReak.length-1;i++)
        {
           var txtRf="R";
           var txtRg=(i+1).toString();
           var txtRh="=";
           var txtRi=ukReak[i].toFixed(5).toString();
           txtRa=txtRa.concat("<br>",txtRf,txtRg,txtRh,txtRi);
        }  
        document.getElementById("r1").innerHTML=txtRa;
      }
      catch(err)
      {
        alert("Desila se greška.Proverite unete podatke.");
        return;
      }

    
      try
      { 
        //crtanje SPOLJNIH SILA
        var c=document.getElementById("slikaspoljnihsila");
        var ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        //ctx.clearRect(0,0,650,250);

        //crtanje nosaca
        if(daLiJePrvoOpt==true)
        {
          //odredjivanje razmere crtanja
            var Kd = 500 / mojaGreda.ukupniraspon;
            //crtanje nosaca
            var duzGr = 500; //duzina grede u pixelima
            ctx.beginPath();
            ctx.moveTo(50,100);
            ctx.lineTo(50+duzGr,100);
            //crtanje nepokretnog oslonca
            ctx.moveTo(50,100);
            ctx.lineTo(55,105);
            ctx.lineTo(45,105);
            ctx.lineTo(50,100);
            ctx.strokeStyle="black";
            ctx.stroke();
            //crtanje ostalih pokretnih oslonaca
            var a1 = 0;
            var razlika=0;
            for (var i = 0; i <= mojaGreda.brojoslonaca - 2; i++)
            {
                razlika=(Kd * mojaGreda.nizraspona[i])-Math.round(Kd * mojaGreda.nizraspona[i]);
                a1 = (a1 + razlika + Math.round(Kd * mojaGreda.nizraspona[i]));
                //crtanje pokretnog oslonca
                ctx.moveTo(50+a1,100);
                ctx.lineTo(45+a1,105);
                ctx.lineTo(55+a1,105);
                ctx.lineTo(50+a1,100);
                ctx.moveTo(45+a1,110);
                ctx.lineTo(55+a1,110);
                ctx.strokeStyle="black";
                ctx.stroke();
            }
          daLiJePrvoOpt=false;
        }

        //crtanje spoljnog opterecenja
        switch(tipopt)
        {
          case "uprkoncsila":
            var p=50;
            var polsilecrtez=new Number(Math.round(polozopt*500/mojaGreda.ukupniraspon)); //duzina grede na crtezu je 500px
            var x0=50;var y0=100;
            var x1=x0+polsilecrtez;var y1=y0;
            var x2=x1;var y2=y1-p;
            var x3=Math.round(x1+p/4);var y3=Math.round(y1-p/4);
            var x4=Math.round(x1-p/4);var y4=Math.round(y1-p/4);
            var x5=Math.round(x2+p/4);var y5=Math.round(y2+p/4);
            var x6=Math.round(x2-p/4);var y6=Math.round(y2+p/4);
           
            if(koncsila>=0)
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x3,y3);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x4,y4);
              ctx.strokeStyle="blue";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="blue";
              ctx.fillText("P="+koncsila.toString(),x2+5,y2-5);
            }
            else
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x5,y5);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x6,y6);
              ctx.strokeStyle="blue";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="blue";
              ctx.fillText("P="+koncsila.toString(),x2+5,y2-5);
            }
            break;

          case "podzkoncsila":
            var p=50;
            var polsilecrtez=new Number(Math.round(polozopt*500/mojaGreda.ukupniraspon));
            var x0=50;var y0=100;
            var x1=x0+polsilecrtez;var y1=y0;
            var x2=x1;var y2=Math.round(y1-p/3);
            var x3=x2+p;var y3=y2;
            var x4=Math.round(x3-p/4);var y4=Math.round(y3-p/4);
            var x5=Math.round(x3-p/4);var y5=Math.round(y3+p/4);
            var x6=Math.round(x2+p/4);var y6=Math.round(y2-p/4);
            var x7=Math.round(x2+p/4);var y7=Math.round(y2+p/4);
           
            if(koncsila>=0)
            {
              ctx.beginPath();
              ctx.moveTo(x2,y2);
              ctx.lineTo(x3,y3);
              ctx.moveTo(x3,y3);
              ctx.lineTo(x4,y4);
              ctx.moveTo(x3,y3);
              ctx.lineTo(x5,y5);
              ctx.strokeStyle="black";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="black";
              ctx.fillText("P="+koncsila.toString(),x2-10,y2-10);
            }
            else
            {
              ctx.beginPath();
              ctx.moveTo(x2,y2);
              ctx.lineTo(x3,y3);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x6,y6);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x7,y7);
              ctx.strokeStyle="black";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="black";
              ctx.fillText("P="+koncsila.toString(),x2-10,y2-10);
            }
            break;

          case "koncmoment":
            var p=50;
            var polsilecrtez=new Number(Math.round(polozopt*500/mojaGreda.ukupniraspon));
            var x0=50;var y0=100;
            var x1=x0+polsilecrtez;var y1=y0;
            var x2=Math.round(x1+p/2);var y2=Math.round(y1-p/2);
            var x3=Math.round(x1-p/2);var y3=Math.round(y1-p/2);
            var x4=Math.round(x3-p/6);var y4=Math.round(y3-p/6);
            var x5=Math.round(x3+p/6);var y5=Math.round(y3-p/6);
            var x6=Math.round(x2-p/6);var y6=Math.round(y2-p/6);
            var x7=Math.round(x2+p/6);var y7=Math.round(y2-p/6);
            var xc=x1;var yc=Math.round(y1-p/2);  //koordinate centra kruga,radijus je 25px
            
           
            if(koncsila>=0)
            {
              ctx.beginPath();
              ctx.arc(xc,yc,25,Math.PI,2*Math.PI);
              ctx.strokeStyle="green";
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(x3,y3);
              ctx.lineTo(x4,y4);
              ctx.moveTo(x3,y3);
              ctx.lineTo(x5,y5);
              ctx.strokeStyle="green";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="green";
              ctx.fillText("M="+koncsila.toString(),x3,y3-25);
            }
            else
            {
              ctx.beginPath();
              ctx.arc(xc,yc,25,Math.PI,2*Math.PI);
              ctx.strokeStyle="green";
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(x2,y2);
              ctx.lineTo(x6,y6);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x7,y7);
              ctx.strokeStyle="green";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="green";
              ctx.fillText("M="+koncsila.toString(),x3,y3-25);
            }
            break;

          case "podopt":
            var p=30;
            var polsilecrtez=new Number(Math.round(polozopt*500/mojaGreda.ukupniraspon));
            var duzsilecrtez=new Number(Math.round(duzopt*500/mojaGreda.ukupniraspon));
            var x0=50;var y0=100;
            var x1=x0+polsilecrtez;var y1=y0;
            var x2=x1;var y2=y1-p;
            var x3=Math.round(x1+p/4);var y3=Math.round(y1-p/4);
            var x4=Math.round(x1-p/4);var y4=Math.round(y1-p/4);
            var x5=Math.round(x2+p/4);var y5=Math.round(y2+p/4);
            var x6=Math.round(x2-p/4);var y6=Math.round(y2+p/4);
           
            if(podopt>=0)
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x3,y3);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x4,y4);
             
              ctx.moveTo(x1+duzsilecrtez,y1);
              ctx.lineTo(x2+duzsilecrtez,y2);
              ctx.moveTo(x1+duzsilecrtez,y1);
              ctx.lineTo(x3+duzsilecrtez,y3);
              ctx.moveTo(x1+duzsilecrtez,y1);
              ctx.lineTo(x4+duzsilecrtez,y4);

              ctx.moveTo(x2,y2);
              ctx.lineTo(x2+duzsilecrtez,y2);

              ctx.strokeStyle="red";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="red";
              ctx.fillText("p="+podopt.toString(),x2+5,y2-5);
            }
            else
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x5,y5);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x6,y6);

              ctx.moveTo(x1+duzsilecrtez,y1);
              ctx.lineTo(x2+duzsilecrtez,y2);
              ctx.moveTo(x2+duzsilecrtez,y2);
              ctx.lineTo(x5+duzsilecrtez,y5);
              ctx.moveTo(x2+duzsilecrtez,y2);
              ctx.lineTo(x6+duzsilecrtez,y6);

              ctx.moveTo(x2,y2);
              ctx.lineTo(x2+duzsilecrtez,y2);

              ctx.strokeStyle="red";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="red";
              ctx.fillText("p="+podopt.toString(),x2+5,y2-5);
            }
            break;

          case "trougdesno":
            var p=30;
            var polsilecrtez=new Number(Math.round(polozopt*500/mojaGreda.ukupniraspon));
            var duzsilecrtez=new Number(Math.round(duzopt*500/mojaGreda.ukupniraspon));
            var x0=50;var y0=100;
            var x1=x0+polsilecrtez+duzsilecrtez;var y1=y0;
            var x2=x1;var y2=y1-p;
            var x3=Math.round(x1+p/4);var y3=Math.round(y1-p/4);
            var x4=Math.round(x1-p/4);var y4=Math.round(y1-p/4);
            var x5=Math.round(x2+p/4);var y5=Math.round(y2+p/4);
            var x6=Math.round(x2-p/4);var y6=Math.round(y2+p/4);
           
            if(trougdesno>=0)
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x3,y3);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x4,y4);

              ctx.moveTo(x2,y2);
              ctx.lineTo(x0+polsilecrtez,y0);

              ctx.strokeStyle="violet";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="violet";
              ctx.fillText("pd="+trougdesno.toString(),x2+5,y2-5);
            }
            else
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x5,y5);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x6,y6);

              ctx.moveTo(x2,y2);
              ctx.lineTo(x0+duzsilecrtez,y0);

              ctx.strokeStyle="violet";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="violet";
              ctx.fillText("pd="+trougdesno.toString(),x2+5,y2-5);
            }
            break;

          case "trouglevo":
            var p=30;
            var polsilecrtez=new Number(Math.round(polozopt*500/mojaGreda.ukupniraspon));
            var duzsilecrtez=new Number(Math.round(duzopt*500/mojaGreda.ukupniraspon));
            var x0=50;var y0=100;
            var x1=x0+polsilecrtez;var y1=y0;
            var x2=x1;var y2=y1-p;
            var x3=Math.round(x1+p/4);var y3=Math.round(y1-p/4);
            var x4=Math.round(x1-p/4);var y4=Math.round(y1-p/4);
            var x5=Math.round(x2+p/4);var y5=Math.round(y2+p/4);
            var x6=Math.round(x2-p/4);var y6=Math.round(y2+p/4);
           
            if(trouglevo>=0)
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x3,y3);
              ctx.moveTo(x1,y1);
              ctx.lineTo(x4,y4);

              ctx.moveTo(x2,y2);
              ctx.lineTo(x0+polsilecrtez+duzsilecrtez,y0);

              ctx.strokeStyle="orange";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="orange";
              ctx.fillText("pl="+trouglevo.toString(),x2+5,y2-5);
            }
            else
            {
              ctx.beginPath();
              ctx.moveTo(x1,y1);
              ctx.lineTo(x2,y2);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x5,y5);
              ctx.moveTo(x2,y2);
              ctx.lineTo(x6,y6);

              ctx.moveTo(x2,y2);
              ctx.lineTo(x0+duzsilecrtez+duzsilecrtez,y0);

              ctx.strokeStyle="orange";
              ctx.stroke();
              ctx.font="15px Arial";
              ctx.fillStyle="orange";
              ctx.fillText("pl="+trouglevo.toString(),x2+5,y2-5);
            }
            break;

        }


        //crtanje DIJAGRAMA NORMALNIH SILA
        c=document.getElementById("slikanormsila");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);

        
        //crtanje nosaca
            //odredjivanje razmere crtanja
            var Kd = 500 / mojaGreda.ukupniraspon;
            //crtanje nosaca
            var duzGr = 500; //duzina grede u pixelima
            ctx.beginPath();
            ctx.moveTo(50,100);
            ctx.lineTo(50+duzGr,100);
            //crtanje nepokretnog oslonca
            ctx.moveTo(50,100);
            ctx.lineTo(55,105);
            ctx.lineTo(45,105);
            ctx.lineTo(50,100);
            ctx.strokeStyle="black";
            ctx.stroke();
            //crtanje ostalih pokretnih oslonaca
            var a1 = 0;
            var razlika=0;
            for (var i = 0; i <= mojaGreda.brojoslonaca - 2; i++)
            {
                razlika=(Kd * mojaGreda.nizraspona[i])-Math.round(Kd * mojaGreda.nizraspona[i]);
                a1 = (a1 + razlika + Math.round(Kd * mojaGreda.nizraspona[i]));
                //crtanje pokretnog oslonca
                ctx.moveTo(50+a1,100);
                ctx.lineTo(45+a1,105);
                ctx.lineTo(55+a1,105);
                ctx.lineTo(50+a1,100);
                ctx.moveTo(45+a1,110);
                ctx.lineTo(55+a1,110);
                ctx.strokeStyle="black";
                ctx.stroke();
            }

            
   
         
        //odredjivanje max vrednosti N dijagrama 
        var maxN=odrediMaxVred(Ndij)

        //odredjivanje razmere N dijagrama
        var Kn = 0; 
        if (maxN==0)
        {
           Kn = 0;
        }
        else
        {
           Kn = (90 /Math.abs(maxN));
        }
 
        //odredjivanje kolekcije tacaka koje cine N dijagram
        //i izcrtavanje tacaka dijagrama N dijagrama
        var Dx=1;
        for (var i = 0; i <= 499-1;i++)
        {
           var t1x=new Number(50 + i * Dx);                     //X koordinata
           var t1y=new Number(Math.floor(100 - Kn * Ndij[i]));  //Y koordinata
           var t2x=new Number(50 + (i+1) * Dx);                   //X koordinata
           var t2y=new Number(Math.floor(100 - Kn * Ndij[i+1]));  //Y koordinata
           ctx.beginPath();
           ctx.moveTo(t1x,t1y);
           ctx.lineTo(t2x,t2y);
           ctx.strokeStyle="red";  //crvena boja
           ctx.stroke();
        }

        //ctranje prve ordinate N dijagrama
        var y1=Math.floor(100 - Kn * Ndij[0]);
        ctx.beginPath();
        ctx.moveTo(50,100);
        ctx.lineTo(50,y1);
        ctx.strokeStyle="red";
        ctx.stroke();

        //ctranje zadnje ordinate N dijagrama
        var y2=Math.floor(100 - Kn * Ndij[499]);
        ctx.beginPath();
        ctx.moveTo(50+duzGr,100);
        ctx.lineTo(50+duzGr,y2);
        ctx.strokeStyle="red";
        ctx.stroke();

      
        //crtanje DIJAGRAMA TRANSVERZALNIH SILA
        c=document.getElementById("slikatranssila");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);

        //crtanje nosaca
        //odredjivanje razmere crtanja
            var Kd = 500 / mojaGreda.ukupniraspon;
            //crtanje nosaca
            var duzGr = 500; //duzina grede u pixelima
            ctx.beginPath();
            ctx.moveTo(50,100);
            ctx.lineTo(50+duzGr,100);
            //crtanje nepokretnog oslonca
            ctx.moveTo(50,100);
            ctx.lineTo(55,105);
            ctx.lineTo(45,105);
            ctx.lineTo(50,100);
            ctx.strokeStyle="black";
            ctx.stroke();
            //crtanje ostalih pokretnih oslonaca
            var a1 = 0;
            var razlika=0;
            for (var i = 0; i <= mojaGreda.brojoslonaca - 2; i++)
            {
                razlika=(Kd * mojaGreda.nizraspona[i])-Math.round(Kd * mojaGreda.nizraspona[i]);
                a1 = (a1 + razlika + Math.round(Kd * mojaGreda.nizraspona[i]));
                //crtanje pokretnog oslonca
                ctx.moveTo(50+a1,100);
                ctx.lineTo(45+a1,105);
                ctx.lineTo(55+a1,105);
                ctx.lineTo(50+a1,100);
                ctx.moveTo(45+a1,110);
                ctx.lineTo(55+a1,110);
                ctx.strokeStyle="black";
                ctx.stroke();
            }

         
        //odredjivanje max vrednosti T dijagrama 
        var maxT=odrediMaxVred(Tdij)

        //odredjivanje razmere T dijagrama
        var Kt = 0; 
        if (maxT==0)
        {
           Kt = 0;
        }
        else
        {
           Kt = (90 /Math.abs(maxT));
        }
 
        //odredjivanje kolekcije tacaka koje cine T dijagram
        //i izcrtavanje tacaka T dijagrama
        Dx = 1;
        for (var i = 0; i <= 499-1;i++)
        {
           var t1x=new Number(50 + i * Dx);                     //X koordinata
           var t1y=new Number(Math.floor(100 - Kt * Tdij[i]));  //Y koordinata
           var t2x=new Number(50 + (i+1) * Dx);                   //X koordinata
           var t2y=new Number(Math.floor(100 - Kt * Tdij[i+1]));  //Y koordinata
           ctx.beginPath();
           ctx.moveTo(t1x,t1y);
           ctx.lineTo(t2x,t2y);
           ctx.strokeStyle="red";  //crvena boja
           ctx.stroke();
        }

        //ctranje prve ordinate T dijagrama
        y1=Math.floor(100 - Kt * Tdij[0]);
        ctx.beginPath();
        ctx.moveTo(50,100);
        ctx.lineTo(50,y1);
        ctx.strokeStyle="red";
        ctx.stroke();

        //ctranje zadnje ordinate T dijagrama
        y2=Math.floor(100 - Kt * Tdij[499]);
        ctx.beginPath();
        ctx.moveTo(50+duzGr,100);
        ctx.lineTo(50+duzGr,y2);
        ctx.strokeStyle="red";
        ctx.stroke();



        //crtanje DIJAGRAMA MOMENATA
        c=document.getElementById("slikamomenata");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);

        //crtanje nosaca
        //odredjivanje razmere crtanja
            var Kd = 500 / mojaGreda.ukupniraspon;
            //crtanje nosaca
            var duzGr = 500; //duzina grede u pixelima
            ctx.beginPath();
            ctx.moveTo(50,100);
            ctx.lineTo(50+duzGr,100);
            //crtanje nepokretnog oslonca
            ctx.moveTo(50,100);
            ctx.lineTo(55,105);
            ctx.lineTo(45,105);
            ctx.lineTo(50,100);
            ctx.strokeStyle="black";
            ctx.stroke();
            //crtanje ostalih pokretnih oslonaca
            var a1 = 0;
            var razlika=0;
            for (var i = 0; i <= mojaGreda.brojoslonaca - 2; i++)
            {
                razlika=(Kd * mojaGreda.nizraspona[i])-Math.round(Kd * mojaGreda.nizraspona[i]);
                a1 = (a1 + razlika + Math.round(Kd * mojaGreda.nizraspona[i]));
                //crtanje pokretnog oslonca
                ctx.moveTo(50+a1,100);
                ctx.lineTo(45+a1,105);
                ctx.lineTo(55+a1,105);
                ctx.lineTo(50+a1,100);
                ctx.moveTo(45+a1,110);
                ctx.lineTo(55+a1,110);
                ctx.strokeStyle="black";
                ctx.stroke();
            }

         
        //odredjivanje max vrednosti M dijagrama 
        var maxM=odrediMaxVred(Mdij)

        //odredjivanje razmere M dijagrama
        var Km = 0; 
        if (maxM==0)
        {
           Km = 0;
        }
        else
        {
           Km = (90 /Math.abs(maxM));
        }
 
        //odredjivanje kolekcije tacaka koje cine M dijagram
        //i izcrtavanje tacaka dijagrama M dijagrama
        Dx = 1;
        for (var i = 0; i <= 499-1;i++)
        {
           var t1x=new Number(50 + i * Dx);                     //X koordinata
           var t1y=new Number(Math.floor(100 - Km * Mdij[i]));  //Y koordinata
           var t2x=new Number(50 + (i+1) * Dx);                   //X koordinata
           var t2y=new Number(Math.floor(100 - Km * Mdij[i+1]));  //Y koordinata
           ctx.beginPath();
           ctx.moveTo(t1x,t1y);
           ctx.lineTo(t2x,t2y);
           ctx.strokeStyle="red";  //crvena boja
           ctx.stroke();
        }

        //ctranje prve ordinate M dijagrama
        y1=Math.floor(100 - Km * Mdij[0]);
        ctx.beginPath();
        ctx.moveTo(50,100);
        ctx.lineTo(50,y1);
        ctx.strokeStyle="red";
        ctx.stroke();

        //ctranje zadnje ordinate M dijagrama
        y2=Math.floor(100 - Km * Mdij[499]);
        ctx.beginPath();
        ctx.moveTo(50+duzGr,100);
        ctx.lineTo(50+duzGr,y2);
        ctx.strokeStyle="red";
        ctx.stroke();
      }
      catch(err)
      {
        alert("Tokom crtanja dijagrama desila se greška");
        return;
      }
        
        //prikaz obavestenja da je proracun uspesno izvrsen
        document.getElementById("krajproracuna").className="pojavi";

        document.getElementById("dugmeProzorTabela").disabled=false;
    
      }



      function odrediMaxVred(nizA)
      {    
          var max = 0;
          if (nizA.length == 0)
          { 
            return max;
          }
          max = nizA[0];
          for (var n = 0; n <= 499; n++)
          {
             if (max <= Math.abs(nizA[n]))
             {
               max = Math.abs(nizA[n]);
             }
          }
          return max;             
      }
     

      function brisanjeSvihOpterecenja()
      {
        prvoopt=true;
        daLiJePrvoOpt=true;

        txt1="Uneti podaci\n";
        redBrOpt=0;

        //brisanje svih clanova niza ukReak
        var s=ukReak.length-1;
        for(var i=0;i<=s;i++)
        {
          ukReak.pop();
        }
        
        


        var tabla1=document.getElementById("tabelarezultata");

        //sada se stara tabela brise
        if(document.getElementById("tabelarezultata").rows.length==brredova+1)
        {
          for(var i=0;i<=brredova-1;i++)
          {
            tabla1.deleteRow(-1);
          }
        }
   
        brredova=0;

        //vise nema mtn dijagrama onemoguciti dugme za proracun pomeranja
        document.getElementById("dugmezapomeranja").disabled=true;

        document.getElementById("rasp").disabled=false;
        document.getElementById("rasp").value="";
        document.getElementById("brosl").disabled=false;
        document.getElementById("brosl").value="";

        document.getElementById("dugmeProzorTabela").disabled=true;

        document.getElementById("tekst").innerHTML="";
  //REAKCIJE
        document.getElementById("r0").innerHTML="";
        document.getElementById("r1").innerHTML="";

        document.getElementById("izborbrisanja").className="nestani";


        //brisanje nacrtanih MTN dijagrama
        var c=document.getElementById("slikanormsila");
        var ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);

        c=document.getElementById("slikatranssila");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);
 
        c=document.getElementById("slikamomenata");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);

        //brisanje nacrtanih spoljnih sila
        c=document.getElementById("slikaspoljnihsila");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza
        ctx.clearRect(0,0,650,250);


         //uklanjanje DIV za prikaz pomeranja ako je ostao otvoren

          document.getElementById("divpomeranja").className="nestani";

          //brisanje tabele pomeranja
          var tabla1=document.getElementById("tabelapomeranja");
          //sada se stara tabela brise
          if(document.getElementById("tabelapomeranja").rows.length==501)
          {
            for(var i=0;i<=499;i++)
            {
              tabla1.deleteRow(-1);
            }
          }

          //brisanje dijagrama pomeranja
          c=document.getElementById("slikapomeranja");
          ctx=c.getContext("2d");
          //brisanje predhodno nacrtanog crteza pomeranja
          ctx.clearRect(0,0,650,250);
      }


      function prikazPozSmerovaSila()
      {
        document.getElementById("pozsmersila").className="pojavisile";
      }

      function ukloniSmeroveSila()
      {
        document.getElementById("pozsmersila").className="nestani";
      }

      function proveraOdlukeBrisanja()
      {
        document.getElementById("izborbrisanja").className="pojavi";
      }

      function opozivBrisanja()
      {
        document.getElementById("izborbrisanja").className="nestani";
      }

      function ukloniKrajProracuna()
      {
        document.getElementById("krajproracuna").className="nestani";
      }

      function promeniSliku()
      {
        document.getElementById("slikasila").src="slike/slika_putace_bele.gif";
      }
      function vratiSliku()
      {
        document.getElementById("slikasila").src="slike/slika_putace.gif";
      }


      function prikaziProzorTabelu()
      {
        //provera velicine klijentovog prozora
        var w=window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var h=window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        if((h<150)||(w<400))
        {
           alert("Povećajte prozor vašeg browser-a, da bi ste mogli videti celu tabelu");
           return;
        }
        if(h<500)
        {
           var h1="";
           h1=h1.concat(h,"px");
           document.getElementById("celatabela").style.height=h1;  
           var h2="";
           h2=h2.concat(h-100,"px");
           document.getElementById("prozor3").style.height=h2;
        }
        else
        {
           document.getElementById("celatabela").style.height="500px";
           document.getElementById("prozor3").style.height="400px";
        }
        if(w<550)
        {
           var w1="";
           w1=w1.concat(w-50,"px");
           document.getElementById("celatabela").style.width=w1;  
           var w2="";
           w2=w2.concat(w-150,"px");
           document.getElementById("prozor3").style.width=w2;

           //sada treba odrediti polozaj putace
           var w3="";
           w3=w3.concat(w-50-35,"px");
           document.getElementById("slikatabela").style.left=w3;
        }
        else
        {
           document.getElementById("celatabela").style.width="500px";
           document.getElementById("prozor3").style.width="400px";
           document.getElementById("slikatabela").style.left="465px";
        }


        var tabla2=document.getElementById("tabelarezultata2");

        //sada se stara tabela brise
        if(document.getElementById("tabelarezultata2").rows.length==501)
        {
          for(var i=0;i<=499;i++)
          {
            tabla2.deleteRow(-1);
          }
        }

        //sada se ukupni dijagrami ispisuju u tabelu
        for(var i=0;i<=499;i++)
        {
          var red=tabla2.insertRow(-1);
          var cel1=red.insertCell(0);
          var cel2=red.insertCell(1);
          var cel3=red.insertCell(2);
          var cel4=red.insertCell(3);
          var cel5=red.insertCell(4);
          cel1.innerHTML=i+1;
          cel2.innerHTML=OsaStapa[i].toFixed(5);
          cel3.innerHTML=Ndij[i].toFixed(5);
          cel4.innerHTML=Tdij[i].toFixed(5);
          cel5.innerHTML=Mdij[i].toFixed(5);
        }

        document.getElementById("celatabela").className="pojavitabela";
        
        document.getElementById("dugmeProzorTabela").disabled=true;

        //zapocinjanje podizanje div elementa
        t=setTimeout(function(){penjanjeDiv()},10);

      }

      function penjanjeDiv()
      {
        if(polozaj>=100)
        {
          t=setTimeout(function(){odbijanjeDiv()},20);         
          return;
        }
        polozaj=polozaj+15;
        
        var brtacke;
        var pol=polozaj.toString();
        brtacke=pol.concat("px");      //bice ispisano npr. brtacke="115px"

        document.getElementById("celatabela").style.bottom=brtacke;
        t=setTimeout(function(){penjanjeDiv()},10);
      }

      function odbijanjeDiv()
      {
        if(polozaj<=0)
        {
          clearTimeout(t);
          // polozaj=-500; ovaj red koda je prebacen u f-ju spustanjeDiv()
          return;
        }
        polozaj=polozaj-5;

        var brtacke;
        var pol=polozaj.toString();
        brtacke=pol.concat("px");      //bice ispisano npr. brtacke="115px"

        document.getElementById("celatabela").style.bottom=brtacke;
        t=setTimeout(function(){odbijanjeDiv()},20);
      }


      function ukloniTabelu()
      {
       //otpocinjanje spustanja div elementa
        t=setTimeout(function(){spustanjeDiv()},20);


        //ovi redovi koda su prebaceni u f-ju spustanjeDiv()
        //document.getElementById("celatabela").className="nestani";
        //document.getElementById("dugmeProzorTabela").disabled=false;
      }

      function spustanjeDiv()
      {
        if(polozaj<=-500)
        {
          clearTimeout(t);
          polozaj=-500;
          
          document.getElementById("celatabela").className="nestani";
          document.getElementById("dugmeProzorTabela").disabled=false;

          return;
        }
        polozaj=polozaj-10;

        var brtacke;
        var pol=polozaj.toString();
        brtacke=pol.concat("px");      //bice ispisano npr. brtacke="115px"

        document.getElementById("celatabela").style.bottom=brtacke;
        t=setTimeout(function(){spustanjeDiv()},15);
      }


      function promeniSliku1()
      {
        document.getElementById("slikatabela").src="slike/slika_putace_bele.gif";
      }

      function vratiSliku1()
      {
        document.getElementById("slikatabela").src="slike/slika_putace.gif";
      }


      
      function prikaziPomeranja()
      {
        //provera velicine klijentovog prozora
        var w=window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        var h=window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        if((h<50)||(w<500))
        {
           alert("Povećajte prozor vašeg browser-a, da bi ste mogli videti dijagram pomeranja");
           return;
        }
        if(h<550)
        {
           var h1="";
           h1=h1.concat(h,"px");
           document.getElementById("divpomeranja").style.height=h1;
           var h2="";
           h2=h2.concat(h-20,"px");
           document.getElementById("poddivpomer").style.height=h2;
        }
        else
        {
           document.getElementById("divpomeranja").style.height="550px";
           document.getElementById("poddivpomer").style.height="530px";
        }
        if(w<1050)
        {
           var w1="";
           w1=w1.concat(w-380,"px");
           document.getElementById("divpomeranja").style.width=w1;
           var w2="";
           w2=w2.concat(w-400,"px");
           document.getElementById("poddivpomer").style.width=w2;
        }
        else
        {
           document.getElementById("divpomeranja").style.width="700px";
           document.getElementById("poddivpomer").style.width="680px";
        }


        document.getElementById("divpomeranja").className="pojavipomeranje";

      }
      function ukloniPomeranja()
      {
        document.getElementById("divpomeranja").className="nestani";

        //brisanje tabele pomeranja
        var tabla1=document.getElementById("tabelapomeranja");
        //sada se stara tabela brise
        if(document.getElementById("tabelapomeranja").rows.length==501)
        {
          for(var i=0;i<=499;i++)
          {
            tabla1.deleteRow(-1);
          }
        }

        //brisanje dijagrama pomeranja
        c=document.getElementById("slikapomeranja");
        ctx=c.getContext("2d");
        //brisanje predhodno nacrtanog crteza pomeranja
        ctx.clearRect(0,0,650,250);
        
      }




      function proracunPomeranja()
      {
       try
       {
        var broslonaca=new Number(document.getElementById("brosl").value);
     
        var nizraspona=new Array();   
        var brclanova;
        var d;var g;
        var nizpomocni=new Array();

        d = new String(document.getElementById("rasp").value);
        g = d.toLowerCase();
        nizpomocni = g.split(",");
        brclanova = nizpomocni.length;

        for (var i = 0; i <= brclanova - 1; i++)
        {
           nizraspona[i] = new Number(nizpomocni[i]);
        }

        var modElas=new Number(document.getElementById("e").value);
        var momInerc=new Number(document.getElementById("ic").value);
        var Povrs=new Number(document.getElementById("f").value);
        

       //PROVERA UNESENIH PODATAKA
        
        //provera da li je uneti modul elasticnosti broj
        if(isNaN(modElas))
        {
          alert("Modul elastičnosti mora biti pozitivan broj.Proverite unetu vrednost modula elastičnosti.");
          return;
        }
        //provera da li je uneti moment inercije broj
        if(isNaN(momInerc))
        {
          alert("moment inercije mora biti pozitivan broj.Proverite unetu vrednost momenta inercije.");
          return;
        }
        //provera da li je uneta povrsina poprecnog preseka broj
        if(isNaN(Povrs))
        {
          alert("Površina poprečnog preseka mora biti pozitivan broj.Proverite unetu vrednost površine poprečnog preseka.");
          return;
        }
        

        //provera da li je modul elasticnosti pozitivan broj
        if(modElas<=0)
        {
          alert("Modul elastičnosti mora biti pozitivan broj.Proverite unetu vrednost.");
          return;
        } 
        //provera da li je moment inercije pozitivan broj
        if(momInerc<=0)
        {
          alert("Moment inercije mora biti pozitivan broj.Proverite unetu vrednost.");
          return;
        } 
        //provera da li je povrsina poprecnog preseka pozitivan broj
        if(Povrs<=0)
        {
          alert("Površina poprečnog preseka mora biti pozitivan broj.Proverite unetu vrednost.");
          return;
        } 
       

        var ukupniraspon=0;
        for (var i = 0; i <= nizraspona.length - 1; i++)
        {
           
           ukupniraspon = ukupniraspon+nizraspona[i];
        }
        var dx=ukupniraspon/499;


        var upravnoPomerOse=new Array();
        var poduznoPomerOse=new Array();
       

        for(var i=0;i<=499;i++)
        {
          var polozaj=dx*i;
          var virtGreda1=new kontinualnagreda(broslonaca,nizraspona,"uprkoncsila",1,polozaj,0);
          var virtGreda2=new kontinualnagreda(broslonaca,nizraspona,"podzkoncsila",1,polozaj,0);

          var R1 = 0;var P1 = 0;
          for (var j = 0; j <= 498; j++)
          {
            var a; var b;var c;
            a = (Mdij[j] + Mdij[j + 1]) / 2;
            b = (virtGreda1.Mdij[j] + virtGreda1.Mdij[j + 1]) / 2;
            R1 = R1 + a * b * dx;
            c = (virtGreda2.Mdij[j] + virtGreda2.Mdij[j + 1]) / 2;
            P1 = P1 + a * c * dx;
          }
          var R2 = 0;var P2 = 0;
          for (var k = 0; k <= 498; k++)
          {
            var a; var b;
            a = (Ndij[k] + Ndij[k + 1]) / 2;
            b = (virtGreda1.Ndij[k] + virtGreda1.Ndij[k + 1]) / 2;
            R2 = R2 + a * b * dx;
            c = (virtGreda2.Ndij[k] + virtGreda2.Ndij[k + 1]) / 2;
            P2 = P2 + a * c * dx;
          }
         
          upravnoPomerOse[i]=R1/(modElas*momInerc)+R2/(modElas*Povrs);
          poduznoPomerOse[i]=P1/(modElas*momInerc)+P2/(modElas*Povrs);            
        }
   
         //popunjavanje tabele
         var tabla1=document.getElementById("tabelapomeranja");

         //sada se stara tabela brise
         if(document.getElementById("tabelapomeranja").rows.length==501)
         {
           for(var i=0;i<=499;i++)
           {
             tabla1.deleteRow(-1);
           }
         }

         //sada se ukupni dijagrami ispisuju u tabelu
         for(var i=0;i<=499;i++)
         {
           var red=tabla1.insertRow(-1);
           var cel1=red.insertCell(0);
           var cel2=red.insertCell(1);
           var cel3=red.insertCell(2);
           var cel4=red.insertCell(3);
        
           cel1.innerHTML=i+1;
           cel2.innerHTML=OsaStapa[i].toFixed(5);
           cel3.innerHTML=poduznoPomerOse[i].toFixed(7);
           cel4.innerHTML=upravnoPomerOse[i].toFixed(7);
         }
        }
        catch(err)
        {
          alert("Tokom proračuna se desila greška. Proverite unete podatke.");
          return;
        }

     
        try
        {
         //crtanje DIJAGRAMA POMERANJA
         var c=document.getElementById("slikapomeranja");
         var ctx=c.getContext("2d");
         //brisanje predhodno nacrtanog crteza
         ctx.clearRect(0,0,650,250);

         //crtanje nosaca
          //odredjivanje razmere crtanja
            var Kd = 500 / ukupniraspon;
            //crtanje nosaca
            var duzGr = 500; //duzina grede u pixelima
            ctx.beginPath();
            ctx.moveTo(50,100);
            ctx.lineTo(50+duzGr,100);
            //crtanje nepokretnog oslonca
            ctx.moveTo(50,100);
            ctx.lineTo(55,105);
            ctx.lineTo(45,105);
            ctx.lineTo(50,100);
            ctx.strokeStyle="black";
            ctx.stroke();
            //crtanje ostalih pokretnih oslonaca
            var a1 = 0;
            var razlika=0;
            for (var i = 0; i <= broslonaca - 2; i++)
            {
                razlika=(Kd * nizraspona[i])-Math.round(Kd * nizraspona[i]);
                a1 = (a1 + razlika + Math.round(Kd * nizraspona[i]));
                //crtanje pokretnog oslonca
                ctx.moveTo(50+a1,100);
                ctx.lineTo(45+a1,105);
                ctx.lineTo(55+a1,105);
                ctx.lineTo(50+a1,100);
                ctx.moveTo(45+a1,110);
                ctx.lineTo(55+a1,110);
                ctx.strokeStyle="black";
                ctx.stroke();
            }
         
         //odredjivanje max vrednosti uprav.pomeranja  
         var maxV=odrediMaxVred(upravnoPomerOse)
         var maxU=odrediMaxVred(poduznoPomerOse)

         //odredjivanje razmere upravnog pomeranja
         var Kv = 0; 
         if (maxV==0)
         {
            Kv = 0;
         }
         else
         {
            Kv = (50 /Math.abs(maxV));
         }
         //odredjivanje razmere poduznog pomeranja
         var Ku = 0; 
         if (maxU==0)
         {
            Ku = 0;
         }
         else
         {
            Ku = (20 /Math.abs(maxU));
         }
 
         //odredjivanje kolekcije tacaka koje cine  dijagram pomeranja
         //i izcrtavanje tacaka dijagrama pomeranja
         var Dx=1;
         for (var i = 0; i <= 498;i++)
         {
           var t1x=new Number(50 + i * Dx + Ku * poduznoPomerOse[i]);         //X koordinata
           var t1y=new Number(Math.floor(100 + Kv * upravnoPomerOse[i]));  //Y koordinata
           var t2x=new Number(50 + (i+1) * Dx + Ku * poduznoPomerOse[i+1]);     //X koordinata
           var t2y=new Number(Math.floor(100 + Kv * upravnoPomerOse[i+1]));  //Y koordinata
           ctx.beginPath();
           ctx.moveTo(t1x,t1y);
           ctx.lineTo(t2x,t2y);
           ctx.strokeStyle="red";  //crvena boja
           ctx.stroke();

           //crtanje vektora pomeranja za trenutnu tacku ose grede
           //crta se vektor pomeranja na svakoj desetoj tacki
           if((i%10)!=0) continue;      //ostatak pri delenju treba da je nula 
           ctx.beginPath();
           ctx.moveTo(50 + i * Dx,100);
           ctx.lineTo(t1x,t1y);
           ctx.strokeStyle="green";  //zelena boja
           ctx.stroke();
         }

         //ctranje prve ordinate dijagrama
         var x1=Math.floor(50 + Ku * poduznoPomerOse[0]);
         var y1=Math.floor(100 + Kv * upravnoPomerOse[0]);
         ctx.beginPath();
         ctx.moveTo(50,100);
         ctx.lineTo(x1,y1);
         ctx.strokeStyle="red";
         ctx.stroke();

         //ctranje zadnje ordinate dijagrama
         var x2=Math.floor(50+duzGr + Ku * poduznoPomerOse[499]);
         var y2=Math.floor(100 + Kv * upravnoPomerOse[499]);
         ctx.beginPath();
         ctx.moveTo(50+duzGr,100);
         ctx.lineTo(x2,y2);
         ctx.strokeStyle="red";
         ctx.stroke();
        }
        catch(err)
        {
          alert("Tokom crtanja dijagrama se desila greška.");
          return;
        }
       

      }

//


let kontinualnaGreda = (broslonaca,nizrasp,tipopt,sila,polozopt,duzopt)=> {
        let a=new kontinualnagreda(broslonaca,nizrasp,tipopt,sila,polozopt,duzopt);
  return a;
}
module.exports = {
  kontinualnaGreda:kontinualnaGreda,
} 