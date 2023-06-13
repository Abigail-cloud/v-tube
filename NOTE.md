   await this.authRepository.findUser(payload.email);

        const hashPassword =  encryptPassword(payload.password);

        const newUser = ({
            id : payload.id,
            user_name : payload.user_name,
            email : payload.email,
            password : hashPassword,
            phone_number : payload.phone_number,
            img : payload.img,
            subscribers: payload.subscribers,
            from_google: false,
            createdAt : payload.createdAt,
            updatedAt : payload.updatedAt
        })
        return newUser;

         try {
            const registerUser: UserInfo = {
                email: req.body.email,
                user_name: req.body.user_name,
                password: req.body.password,
                phone_number: req.body.number,
                subscribers: req.body.number,
                img: req.body.image,
                from_google: req.body.from_google,
                id: 1,
                createdAt: new Date,
                updatedAt: new Date,
            }
            const user = await this.auth_service.register(registerUser);
            res.status(StatusCodes.CREATED).json({user});
        } catch (error : any) {
            console.error(error);
             return res.status(StatusCodes.CONFLICT).send(error.errors)
        }
     }