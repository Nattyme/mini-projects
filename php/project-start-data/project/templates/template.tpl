<style>
    .main {
        background-color: coral;
        padding: 50px;
        display: flex;
    }

    .aside {
        width: 300px;
        height: 600px;
        background-color: blue;
        font-size: 32px;
        color: white;
    }

    .content {
        background-color: white;
        width: 600px;
        height: 800px;
        font-size: 32px;
        color: black;
    }

</style>


<main class="main">
    <aside class="aside">
        SIDEBAR
    </aside>

    <div class="content">
        <?php echo $content; ?>
    </div>
</main>