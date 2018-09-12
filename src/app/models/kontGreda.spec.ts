import { kontGreda } from './kontGreda';
describe('kontGreda', () => {
    it('created', () => {
            let greda= new kontGreda({brOslonca:2,nizRaspona:[4]});

            expect(greda).toBeDefined();
    });
    it('testing calculate function return [True]', () => {
        let greda= new kontGreda({brOslonca:3,nizRaspona:[2,3]});
        greda.calculate({sila:5,tipopt:"podopt",polozopt:0,duzopt:5});
        greda.calculate({sila:2,tipopt:"podopt",polozopt:2,duzopt:3});

        let result=greda.Mdij[200].toFixed(5) ==5.67545 &&
        greda.Tdij[200].toFixed(5) ==12.38032 &&
        greda.Mdij[377].toFixed(5) ==-5.27249 &&
        greda.Tdij[377].toFixed(5) ==-0.03451;

        expect(result).toBeTruthy();
    });

    it('testing calculateAll function return [True]', () => {
        let greda= new kontGreda({brOslonca:3,nizRaspona:[2,3]});
        
        greda.optercenja.push({sila:5,tipopt:"podopt",polozopt:0,duzopt:5});
        greda.optercenja.push({sila:2,tipopt:"podopt",polozopt:2,duzopt:3});

        greda.calculate({sila:2,tipopt:"podopt",polozopt:2,duzopt:3}).then(()=>{
            greda.calculateAll().then(()=>{
                let result=greda.Mdij[200].toFixed(5) ==5.67545 &&
                greda.Tdij[200].toFixed(5) ==12.38032 &&
                greda.Mdij[377].toFixed(5) ==-5.27249 &&
                greda.Tdij[377].toFixed(5) ==-0.03451;
        
                expect(result).toBeTruthy();
            });
        })
    });
  
  });