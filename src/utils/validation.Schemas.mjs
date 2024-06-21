

export const createUserValidationSchema={
    name:{
     isLength:{
        options:{
            min:3,
            max:32
        },
        errorMessage:'Name must be at least 3-32 characters'
       },
       notEmpty:{
        errorMessage:'Name must not be empty'
      },
      isString:{
       errorMessage:'Name must be string value'
      }
     },
     username:{
        isLength:{
           options:{
               min:5,
               max:32
           },
           errorMessage:'userame must be at least 5-32 characters'
          },
          notEmpty:{
           errorMessage:'username must not be empty'
         },
         isString:{
          errorMessage:'username must be string value'
         }
        },

}