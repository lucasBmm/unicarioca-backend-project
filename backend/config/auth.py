import bcrypt

def encrypt(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_pass(pass_provided, pass_stored):
    if bcrypt.checkpw(pass_provided.encode('utf-8'), pass_stored):
        print("Login bem sucedido")
        return True
    return False