<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Chispudito Express - Administración</title>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
</head>

<body>

    <div class="align-self-center navbar-orange">
        <header class="blog-header py-3 ">
            <div class="row flex-nowrap justify-content-between align-items-center">
                <div class="col-6 offset-3 text-center">
                    <h1 class="text-white">Chispudito Express</h1>
                </div>
            </div>
        </header>
    </div>

    <main role="main">

        @if (count($errors))
        <div class="form-group container">
            <div class="alert alert-danger">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </div>
        </div>
        @endif
       <br>
       <div class="col-6 col-xs-12 offset-3">
            <div class="panel panel-default">
                <div class="panel-fill-head color-darkblue">
                    <h2 class="header-title">Ingresar al Sistema</h2>
                </div>
                <div class="panel-fill-body color-blue">
                    <form method="POST" action="/login">
                        {{csrf_field()}}
                        <div class="row">
                            <div class="form-group col-5 col-xs-6 offset-1">
                                <label >Usuario</label>
                                <input type="text" id="user" name="user" class="form-control" autocomplete="off" required />
                            </div>
                            <div class="form-group col-5 col-xs-6 ">
                                <label>Constraseña </label>
                                <input type="password" id="password" name="password" class="form-control" autocomplete="off" required />
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="control-group form-group col-8 offset-2">
                                <input type="submit" value="Iniciar Sesión" class="btn btn-lg btn-success col-12"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</body>
<script>

</script>
</html>